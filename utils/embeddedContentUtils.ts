// Utility to fix embedded content (iframes, videos) for mobile responsiveness
export const fixEmbeddedContent = () => {
  if (typeof window === 'undefined') return;

  // Fix all iframes
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    // Ensure iframe has proper responsive attributes
    if (!iframe.style.maxWidth) {
      iframe.style.maxWidth = '100%';
    }
    if (!iframe.style.width) {
      iframe.style.width = '100%';
    }

    // Set height based on aspect ratio for common services
    const src = iframe.src || '';
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      iframe.style.aspectRatio = '16/9';
      iframe.style.height = 'auto';
      iframe.style.minHeight = '200px';
    } else if (
      src.includes('google.com/maps') ||
      src.includes('maps.google.com')
    ) {
      iframe.style.height = '300px';
      if (window.innerWidth <= 640) {
        iframe.style.height = '250px';
      }
      if (window.innerWidth <= 390) {
        iframe.style.height = '200px';
      }
    }

    // Add responsive wrapper if not already wrapped
    if (!iframe.parentElement?.classList.contains('responsive-embed')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'responsive-embed';
      iframe.parentNode?.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    }
  });

  // Fix videos
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.style.maxWidth = '100%';
    video.style.width = '100%';
    video.style.height = 'auto';
  });

  // Fix embedded objects
  const embeds = document.querySelectorAll('embed, object');
  embeds.forEach(embed => {
    const htmlEmbed = embed as HTMLElement;
    htmlEmbed.style.maxWidth = '100%';
    htmlEmbed.style.width = '100%';
  });
};

// Auto-fix embedded content when DOM is ready
export const autoFixEmbeddedContent = () => {
  if (typeof window === 'undefined') return;

  // Run on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixEmbeddedContent);
  } else {
    fixEmbeddedContent();
  }

  // Also run on window resize to handle orientation changes
  window.addEventListener('resize', () => {
    setTimeout(fixEmbeddedContent, 100);
  });

  // Use MutationObserver to fix dynamically added content
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Check if the added node contains iframes or videos
            if (
              element.tagName === 'IFRAME' ||
              element.tagName === 'VIDEO' ||
              element.tagName === 'EMBED' ||
              element.tagName === 'OBJECT' ||
              element.querySelector('iframe, video, embed, object')
            ) {
              setTimeout(fixEmbeddedContent, 100);
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

// Function to wrap YouTube URLs in responsive containers
export const makeYouTubeResponsive = (html: string): string => {
  // Replace YouTube iframe with responsive wrapper
  return html.replace(
    /<iframe([^>]*src="[^"]*(?:youtube\.com|youtu\.be)[^"]*"[^>]*)>/gi,
    '<div class="responsive-embed"><iframe$1></iframe></div>'
  );
};

// Function to wrap Google Maps in responsive containers
export const makeGoogleMapsResponsive = (html: string): string => {
  // Replace Google Maps iframe with responsive wrapper
  return html.replace(
    /<iframe([^>]*src="[^"]*(?:google\.com\/maps|maps\.google\.com)[^"]*"[^>]*)>/gi,
    '<div class="responsive-embed"><iframe$1 style="height: 300px;"></iframe></div>'
  );
};

// Combined function to make all embedded content responsive
export const makeEmbeddedContentResponsive = (html: string): string => {
  let processedHtml = html;

  // Process YouTube videos
  processedHtml = makeYouTubeResponsive(processedHtml);

  // Process Google Maps
  processedHtml = makeGoogleMapsResponsive(processedHtml);

  // Process other iframes
  processedHtml = processedHtml.replace(
    /<iframe(?![^>]*class="[^"]*responsive-embed[^"]*")([^>]*)>/gi,
    '<iframe$1 style="max-width: 100%; width: 100%;">'
  );

  return processedHtml;
};
