// Project: Dyslexia-Friendly Font Converter Chrome Extension

// Content script to inject dyslexia-friendly font styles into a webpage

// 1. Add a listener to apply the font styling when the extension is activated
document.addEventListener('DOMContentLoaded', () => {
  const dyslexicFont = `
    @font-face {
      font-family: 'OpenDyslexic';
      src: url('https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic/2017/OpenDyslexic-Regular.otf');
    }
    * {
      font-family: 'OpenDyslexic', Arial, sans-serif !important;
    }
  `;

  // 2. Create a style element to apply the font
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(dyslexicFont));

  // 3. Append the style element to the head of the document
  document.head.appendChild(styleElement);

  console.log('Dyslexia-friendly font applied!');
});

// Next Steps:
// 1. Create a manifest.json to define the Chrome Extension.
// 2. Include this content script in the "content_scripts" section of the manifest.
// 3. Add an activation button via a browser action or popup.

/* Example manifest.json:
{
  "manifest_version": 3,
  "name": "Dyslexia-Friendly Font Converter",
  "version": "1.0",
  "description": "A Chrome Extension to convert text on webpages into a dyslexia-friendly font.",
  "permissions": ["activeTab"],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "action": {
    "default_title": "Enable Dyslexia-Friendly Font",
    "default_icon": "icon.png"
  }
}
*/
