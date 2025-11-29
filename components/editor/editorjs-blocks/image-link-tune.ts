/**
 * Custom tune for Editor.js Image block to add/edit links
 */

export interface ImageLinkTuneData {
  url?: string;
}

export default class ImageLinkTune {
  private data: ImageLinkTuneData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private api: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private block: any;

  static get isTune() {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ data, api, block }: any) {
    this.data = (data as ImageLinkTuneData) || {};
    this.api = api;
    this.block = block;
  }

  render(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "padding: 8px;";

    const label = document.createElement("label");
    label.textContent = "Image Link URL:";
    label.style.cssText = "display: block; font-size: 12px; font-weight: 500; margin-bottom: 4px; color: #374151;";

    const input = document.createElement("input");
    input.type = "text";
    input.value = this.data.url || "";
    input.placeholder = "https://example.com";
    input.style.cssText = "width: 100%; padding: 6px 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;";

    input.addEventListener("input", () => {
      this.data.url = input.value.trim();
      this.applyLink();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Link";
    removeBtn.type = "button";
    removeBtn.style.cssText = "margin-top: 6px; padding: 4px 8px; font-size: 11px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%;";
    removeBtn.addEventListener("click", () => {
      this.data.url = "";
      input.value = "";
      this.removeLink();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    if (this.data.url) {
      wrapper.appendChild(removeBtn);
    }

    return wrapper;
  }

  save(): ImageLinkTuneData {
    return {
      url: this.data.url || "",
    };
  }

  private applyLink() {
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blockElement = (this.block as any).holder as HTMLElement;
      if (!blockElement) return;

      const img = blockElement.querySelector("img") as HTMLImageElement;
      if (!img) return;

      const url = this.data.url?.trim();
      
      if (url) {
        // Check if image already has a link
        const existingLink = img.parentElement?.tagName === "A" ? img.parentElement as HTMLAnchorElement : null;
        
        if (existingLink) {
          existingLink.href = url;
          existingLink.target = "_blank";
          existingLink.rel = "noopener noreferrer";
        } else {
          // Wrap image in anchor tag
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.style.cssText = "display: inline-block; text-decoration: none;";
          
          const parent = img.parentElement;
          if (parent) {
            parent.insertBefore(link, img);
            link.appendChild(img);
          } else {
            blockElement.insertBefore(link, img);
            link.appendChild(img);
          }
        }

        // Add visual indicator
        img.style.cursor = "pointer";
        if (!img.style.border || img.style.border === "none") {
          img.style.border = "2px solid #4a90e2";
          img.style.borderRadius = "4px";
        }
      } else {
        this.removeLink();
      }
    }, 100);
  }

  private removeLink() {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blockElement = (this.block as any).holder as HTMLElement;
      if (!blockElement) return;

      const img = blockElement.querySelector("img") as HTMLImageElement;
      if (!img) return;

      const link = img.parentElement?.tagName === "A" ? img.parentElement as HTMLAnchorElement : null;
      if (link) {
        const parent = link.parentElement;
        if (parent) {
          parent.insertBefore(img, link);
          link.remove();
        } else {
          blockElement.insertBefore(img, link);
          link.remove();
        }

        // Remove visual indicator (but keep original border if it was set by Editor.js)
        img.style.cursor = "";
        // Only remove our custom border, keep Editor.js border
        if (img.style.border === "2px solid rgb(74, 144, 226)" || img.style.border === "2px solid #4a90e2") {
          img.style.border = "";
          img.style.borderRadius = "";
        }
      }
    }, 100);
  }
}

