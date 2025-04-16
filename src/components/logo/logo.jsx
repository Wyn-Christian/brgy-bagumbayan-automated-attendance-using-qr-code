import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import SVGLogo from './logo.svg'
import { logoClasses } from './classes';


// ----------------------------------------------------------------------

export function Logo({ sx, disabled, className, href = '/', isSingle = false, ...other }) {

  const logo = (
    <SVGLogo
      width="100%"
      height="100%"
      fill="#000000"
    />
  )

  return (
    <LogoRoot
      component={RouterLink}
      href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
    >
      <LogoContainer
        sx={[
          {
            width: 64,
            height: 64,
            padding: 1,
            backgroundColor: 'white',
            // ...(!isSingle && { width: 80, height: 22 }),
            ...(disabled && { pointerEvents: 'none' }),
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >

        {logo}
      </LogoContainer>
      {!isSingle &&
        <Typography variant='h5' textTransform='uppercase' lineHeight={1}  >
          <div>Barangay</div>
          Bagumbayan
        </Typography>
      }
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
}));

const LogoContainer = styled('div')(() => ({
  flexShrink: 0,
  color: 'inherit',
  display: 'inline-flex',
  verticalAlign: 'middle',
}))