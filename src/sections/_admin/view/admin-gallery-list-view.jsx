// src\sections\_admin\view\admin-gallery-list-view.jsx

'use client';

import { varAlpha } from 'minimal-shared/utils';

import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';

import { paths } from 'src/routes/paths';

import { Image } from 'src/components/image';
import { Lightbox, useLightBox } from 'src/components/lightbox';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function AdminGalleryListView({ data = [] }) {
  console.log(data);

  const slides = data.map((item) => ({
    key: String(item.id),
    src: item.image_path,
    title: item.purpose || 'Untitled',
    created_at: item.created_at,
    user: item.user,
  }));

  const lightbox = useLightBox(slides);

  return (
    <>
      <CustomBreadcrumbs
        heading="Face Image Gallery"
        links={[
          { name: 'Dashboard', href: paths.admin.dashboard },
          { name: 'Gallery', href: paths.admin.attendance.list }, // You might want to change this to paths.admin.gallery.list
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Container maxWidth="md" sx={{ py: 5 }}>
        {slides.length > 0 ? (
          <ImageList variant="masonry" cols={3} gap={8}>
            {slides.map((item, index) => (
              <ImageListItem
                key={item.key}
                onClick={() => lightbox.onOpen(item.src)}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    opacity: 0.9,
                  },
                }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  sx={{ borderRadius: 1 }}
                  slotProps={{
                    overlay: {
                      sx: (theme) => ({
                        '&:hover': {
                          backgroundImage: `linear-gradient(to bottom, transparent, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.4)})`,
                        },
                      }),
                    },
                  }}
                />
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {item.user?.full_name || 'Unknown User'}
                </Typography>

                {/* Purpose */}
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>

                {/* Date */}
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.created_at).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </Typography>
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            No images found.
          </Typography>
        )}
      </Container>

      <Lightbox
        open={lightbox.open}
        close={lightbox.onClose}
        slides={slides}
        index={lightbox.selected}
      />
    </>
  );
}
