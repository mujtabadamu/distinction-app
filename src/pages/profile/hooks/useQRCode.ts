import { useRef } from 'react';
import { Notify } from '@flexisaf/flexibull2';
import { UserProfileDTO } from 'generated/index';
import { isEnvEqual } from 'utils/helpers';
import { Environment } from 'utils/constants';

interface UseQRCodeProps {
  profileData: UserProfileDTO | null;
}

export const baseUrl = isEnvEqual(Environment.Development)
  ? 'https://schools.distinctionapp.flexisafapps-dev.com'
  : 'https://dashboard.distinction.app';

export const useQRCode = ({ profileData }: UseQRCodeProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrValue = `${baseUrl}/d/${profileData?.username || ''}`;

  // Helper function to generate QR code image as a File
  const generateQRCodeFile = async (): Promise<File | null> => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return null;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = 256;
        canvas.height = 256;
        ctx?.drawImage(img, 0, 0, 256, 256);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            const file = new File(
              [blob],
              `${profileData?.username || 'user'}-qrcode.png`,
              {
                type: 'image/png',
              }
            );
            resolve(file);
          } else {
            resolve(null);
          }
        }, 'image/png');
      };
      img.src = url;
    });
  };

  // Download QR code as PNG
  const handleDownload = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = 256;
        canvas.height = 256;
        ctx?.drawImage(img, 0, 0, 256, 256);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${profileData?.username || 'user'}-qrcode.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  // Share QR code image
  const handleShare = async () => {
    try {
      if (navigator.share) {
        const qrFile = await generateQRCodeFile();
        if (qrFile) {
          await navigator.share({
            title: `Check out ${profileData?.firstName}'s profile`,
            text: `Scan this QR code to view ${profileData?.firstName}'s profile`,
            files: [qrFile],
          });
        } else {
          throw new Error('Failed to generate QR code image');
        }
      }
    } catch (error) {
      Notify(error, {
        status: 'error',
      });
    }
  };

  return {
    qrRef,
    qrValue,
    handleDownload,
    handleShare,
  };
};
