'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/logger';

const ServiceWorkerProvider = () => {
  // Add CSS animations for the install prompt
  useEffect(() => {
    const styles = `
      <style>
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
      </style>
    `;

    // Add styles to head if not already present
    if (!document.querySelector('#install-prompt-styles')) {
      const styleElement = document.createElement('div');
      styleElement.id = 'install-prompt-styles';
      styleElement.innerHTML = styles;
      document.head.appendChild(styleElement);
    }
  }, []);

  useEffect(() => {
    // Register service worker only in production
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            '/sw.js',
            {
              scope: '/',
            }
          );

          logger.info('Service Worker registered successfully');

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New content available
                    logger.info('New content available - please refresh');
                    showUpdateNotification();
                  } else {
                    // Content cached for offline use
                    logger.info('Content cached for offline use');
                    showCachedNotification();
                  }
                }
              });
            }
          });

          // Handle controlling worker change
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            logger.info('Service Worker controller changed');
            window.location.reload();
          });
        } catch (error) {
          logger.error('Service Worker registration failed:', error);
        }
      };

      window.addEventListener('load', () => {
        registerServiceWorker();
      });
    }
  }, []);

  const showUpdateNotification = () => {
    // Show a subtle notification about new content
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div class="update-notification">
        <strong>New content available!</strong>
        <br>
        <small>Click to refresh and get the latest updates</small>
      </div>
    `;

    const notificationElement = notification.firstElementChild as HTMLElement;
    notificationElement.addEventListener('click', () => {
      window.location.reload();
    });

    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 10000);
  };

  const showCachedNotification = () => {
    // Show a notification about offline availability
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div class="cached-notification">
        <strong>App ready for offline use!</strong>
        <br>
        <small>You can now browse even without internet</small>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);
  };

  // Check for app installation
  useEffect(() => {
    let deferredPrompt: any;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Completely disable install prompts by not storing the event
      // and not showing any UI
      return;
    };

    const showInstallPrompt = () => {
      // Install prompts disabled - return early
      return;

      // Check if already installed or user already dismissed
      if (
        window.matchMedia &&
        window.matchMedia('(display-mode: standalone)').matches
      ) {
        return; // Already installed
      }

      const installButton = document.createElement('div');
      installButton.innerHTML = `
        <div class="install-prompt">
          <button class="install-prompt-close" title="Close">×</button>
          <div class="install-prompt-content">
            <div class="install-prompt-icon">📱</div>
            <div>
              <strong>Install Technical Sewa App</strong>
              <br>
              <small>Quick access from your home screen</small>
            </div>
          </div>
          <div class="install-prompt-buttons">
            <button class="maybe-later-btn">Maybe Later</button>
            <button class="install-btn">Install</button>
          </div>
        </div>
      `;

      const installElement = installButton.firstElementChild as HTMLElement;
      const closeButton = installElement.querySelector(
        'button:first-of-type'
      ) as HTMLButtonElement;
      const maybeButton = installElement.querySelector(
        '.maybe-later-btn'
      ) as HTMLButtonElement;
      const installButtonElement = installElement.querySelector(
        '.install-btn'
      ) as HTMLButtonElement;

      // Close button (X) functionality
      closeButton.addEventListener('click', () => {
        // Store dismissal timestamp for 7 days
        localStorage.setItem('install-prompt-dismissed', Date.now().toString());
        logger.info('Install prompt closed by user');

        // Add fade out animation
        installElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
          if (installButton.parentNode) {
            document.body.removeChild(installButton);
          }
        }, 300);
      });

      // Maybe Later button functionality
      maybeButton.addEventListener('click', () => {
        // Store dismissal timestamp for 7 days
        localStorage.setItem('install-prompt-dismissed', Date.now().toString());
        logger.info('Install prompt dismissed by user (Maybe Later)');

        // Add fade out animation
        installElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
          if (installButton.parentNode) {
            document.body.removeChild(installButton);
          }
        }, 300);
      });

      // Install button functionality
      installButtonElement.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          logger.info('Install prompt result:', outcome);

          if (outcome === 'accepted') {
            localStorage.setItem('app-installed', 'true');
          }
          deferredPrompt = null;
        }

        // Add fade out animation
        installElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
          if (installButton.parentNode) {
            document.body.removeChild(installButton);
          }
        }, 300);
      });

      document.body.appendChild(installButton);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ServiceWorkerProvider;
