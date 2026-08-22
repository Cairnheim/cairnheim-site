/**
 * Vercel Web Analytics
 * Injects the Vercel Analytics script for tracking page views
 */
(function() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  
  // Initialize the analytics queue
  if (!window.va) {
    window.va = function() {
      (window.vaq = window.vaq || []).push(arguments);
    };
  }
  
  // Create and inject the analytics script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  
  // Add SDK metadata
  script.setAttribute('data-sdkn', '@vercel/analytics');
  script.setAttribute('data-sdkv', '2.0.1');
  
  // Handle script loading errors
  script.onerror = function() {
    console.log('[Vercel Web Analytics] Failed to load analytics script');
  };
  
  // Append the script to the document head
  if (document.head) {
    document.head.appendChild(script);
  }
})();
