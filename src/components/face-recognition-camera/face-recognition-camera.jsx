'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const STABLE_FRAMES = 75;
const COUNTDOWN_SECONDS = 2;
const POSITION_DELTA_THRESHOLD = 15;
const SIZE_DELTA_THRESHOLD = 15;
const MIN_FACE_WIDTH_RATIO = 0.25;
const MAX_FACE_WIDTH_RATIO = 0.35;

export function FaceRecognitionCamera({ open, onClose, onCancel, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceDetectorRef = useRef(null);
  const faceStableCount = useRef(0);
  const lastBox = useRef(null);
  const hasCaptured = useRef(false);

  const [statusMessage, setStatusMessage] = useState('Waiting for camera...');
  const [countdown, setCountdown] = useState(null);

  const resetCameraState = () => {
    hasCaptured.current = false;
    faceStableCount.current = 0;
    lastBox.current = null;
    setCountdown(null);
    setStatusMessage('Waiting for camera...');
  };

  useEffect(() => {
    const setup = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
      );
      const detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
        },
        runningMode: 'VIDEO',
      });
      faceDetectorRef.current = detector;
    };

    setup();
  }, []);

  useEffect(() => {
    if (!open) {
      resetCameraState();

      return;
    }

    const enableCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = videoRef.current;
      video.srcObject = stream;
      video.onloadeddata = () => {
        video.play();
        detect();
      };
    };

    enableCamera();
  }, [open]);

  const detect = async () => {
    if (!faceDetectorRef.current || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const detector = faceDetectorRef.current;
    const results = await detector.detectForVideo(video, performance.now());
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.detections.length === 1) {
      const detection = results.detections[0];
      const box = detection.boundingBox;
      const faceWidthRatio = box.width / canvas.width;

      if (faceWidthRatio < MIN_FACE_WIDTH_RATIO) {
        setStatusMessage("📏 You're too far. Move closer.");
        faceStableCount.current = 0;
        setCountdown(null);
        requestAnimationFrame(detect);
        return;
      } else if (faceWidthRatio > MAX_FACE_WIDTH_RATIO) {
        setStatusMessage("📏 You're too close. Move back.");
        faceStableCount.current = 0;
        setCountdown(null);
        requestAnimationFrame(detect);
        return;
      }

      if (lastBox.current) {
        const dx = Math.abs(box.originX - lastBox.current.originX);
        const dy = Math.abs(box.originY - lastBox.current.originY);
        const dw = Math.abs(box.width - lastBox.current.width);

        const isStable =
          dx < POSITION_DELTA_THRESHOLD &&
          dy < POSITION_DELTA_THRESHOLD &&
          dw < SIZE_DELTA_THRESHOLD;

        if (isStable) {
          faceStableCount.current += 1;
          const secondsRemaining = Math.ceil((STABLE_FRAMES - faceStableCount.current) / 30);

          if (secondsRemaining <= COUNTDOWN_SECONDS) {
            setCountdown(secondsRemaining);
            setStatusMessage(`✅ Holding still... Capturing in ${secondsRemaining}s`);
          } else {
            setCountdown(null);
            setStatusMessage('✅ Holding still...');
          }
        } else {
          faceStableCount.current = 0;
          setCountdown(null);
          setStatusMessage('🟡 Face moved. Hold still.');
        }
      } else {
        faceStableCount.current = 1;
        setCountdown(null);
        setStatusMessage('🟡 Detecting face...');
      }

      lastBox.current = box;

      if (faceStableCount.current >= STABLE_FRAMES && !hasCaptured.current) {
        setStatusMessage('📸 Capturing...');
        capture();
      }
    } else if (results.detections.length > 1) {
      setStatusMessage('⚠️ Multiple faces detected');
      faceStableCount.current = 0;
      setCountdown(null);
    } else {
      setStatusMessage('🔍 Looking for a face...');
      faceStableCount.current = 0;
      setCountdown(null);
    }

    requestAnimationFrame(detect);
  };

  const capture = () => {
    hasCaptured.current = true;
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'face.jpg', { type: 'image/jpeg' });

      onCapture(file);
      onClose();
    }, 'image/jpeg');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Face Recognition</DialogTitle>
      <DialogContent>
        <Typography align="center" color="text.secondary">
          {statusMessage}
        </Typography>
        <Box sx={{ position: 'relative', width: 640, height: 480, mx: 'auto', mt: 2 }}>
          <video
            ref={videoRef}
            width="640"
            height="480"
            style={{ position: 'absolute', zIndex: 1, transform: 'scaleX(-1)' }}
            muted
            autoPlay
          />
          <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 2 }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={capture} variant="contained" color="primary">
          Manual Capture
        </Button>
      </DialogActions>
    </Dialog>
  );
}
