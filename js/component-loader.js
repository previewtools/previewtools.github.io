/**
 * Component Loader
 * Loads reusable HTML components (Header, Footer, Sidebar, etc.)
 */

const ComponentLoader = {
  components: {
    header: '/components/header.html',
    footer: '/components/footer.html',
    sidebar: '/components/sidebar.html',
    allTools: '/components/all-tools.html'
  },

  /**
   * Load a component into a container
   */
  async loadComponent(componentName, containerId) {
    try {
      const componentPath = this.components[componentName];
      if (!componentPath) {
        console.error(`[v0] Component "${componentName}" not found`);
        return false;
      }

      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`[v0] Container "${containerId}" not found`);
        return false;
      }

      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      container.innerHTML = html;

      // Execute any scripts in the loaded component
      const scripts = container.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });

      console.log(`[v0] Component "${componentName}" loaded successfully`);
      return true;
    } catch (error) {
      console.error(`[v0] Error loading component "${componentName}":`, error);
      return false;
    }
  },

  /**
   * Load multiple components at once
   */
  async loadComponents(components) {
    const promises = Object.entries(components).map(([componentName, containerId]) =>
      this.loadComponent(componentName, containerId)
    );

    try {
      await Promise.all(promises);
      console.log('[v0] All components loaded successfully');
      return true;
    } catch (error) {
      console.error('[v0] Error loading components:', error);
      return false;
    }
  }
};

// Load components on page load
document.addEventListener('DOMContentLoaded', function() {
  ComponentLoader.loadComponents({
    header: 'header-container',
    footer: 'footer-container',
    sidebar: 'sidebar-container'
  });
});
