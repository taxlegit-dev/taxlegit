import type { BlockTool, BlockToolConstructorOptions, BlockToolData } from "@editorjs/editorjs";

export interface ColumnsData extends BlockToolData {
  leftContent: string;
  rightContent: string;
  layout: "50-50" | "33-67" | "67-33";
}

export default class ColumnsBlock implements BlockTool {
  private data: ColumnsData;
  private wrapper: HTMLElement | null = null;
  private leftEditor: HTMLElement | null = null;
  private rightEditor: HTMLElement | null = null;
  private layoutSelect: HTMLSelectElement | null = null;

  static get toolbox() {
    return {
      title: "Columns",
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="7" height="16" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="11" y="2" width="7" height="16" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor({ data }: BlockToolConstructorOptions<ColumnsData>) {
    this.data = {
      leftContent: data?.leftContent || "",
      rightContent: data?.rightContent || "",
      layout: data?.layout || "50-50",
    };
  }

  render(): HTMLElement {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("columns-block-wrapper");
    this.wrapper.style.cssText = "padding: 10px; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px 0;";

    // Layout selector
    const layoutContainer = document.createElement("div");
    layoutContainer.style.cssText = "margin-bottom: 10px; display: flex; align-items: center; gap: 10px;";
    
    const layoutLabel = document.createElement("label");
    layoutLabel.textContent = "Layout:";
    layoutLabel.style.cssText = "font-size: 12px; font-weight: 500;";
    
    this.layoutSelect = document.createElement("select");
    this.layoutSelect.style.cssText = "padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px;";
    this.layoutSelect.innerHTML = `
      <option value="50-50" ${this.data.layout === "50-50" ? "selected" : ""}>50% / 50%</option>
      <option value="33-67" ${this.data.layout === "33-67" ? "selected" : ""}>33% / 67%</option>
      <option value="67-33" ${this.data.layout === "67-33" ? "selected" : ""}>67% / 33%</option>
    `;
    this.layoutSelect.addEventListener("change", () => {
      this.data.layout = this.layoutSelect?.value as ColumnsData["layout"];
      this.updateLayout();
    });

    layoutContainer.appendChild(layoutLabel);
    layoutContainer.appendChild(this.layoutSelect);

    // Columns container
    const columnsContainer = document.createElement("div");
    columnsContainer.classList.add("columns-container");
    this.updateLayout(columnsContainer);

    // Left column
    const leftColumn = document.createElement("div");
    leftColumn.classList.add("column-left");
    leftColumn.style.cssText = "padding: 10px; min-height: 100px;";
    
    this.leftEditor = document.createElement("div");
    this.leftEditor.contentEditable = "true";
    this.leftEditor.innerHTML = this.data.leftContent;
    this.leftEditor.style.cssText = "outline: none; min-height: 80px;";
    // Allow all paste types
    this.leftEditor.setAttribute("contenteditable", "true");
    
    // Add paste support for images
    this.leftEditor.addEventListener("paste", (e) => {
      this.handlePaste(e, this.leftEditor!);
    });
    
    // Add image link handlers
    this.addImageLinkHandlers(this.leftEditor);
    
    // Add image upload button
    const leftImageBtn = this.createImageButton(() => this.insertImage(this.leftEditor!));
    leftColumn.appendChild(leftImageBtn);
    
    this.leftEditor.addEventListener("input", () => {
      this.data.leftContent = this.leftEditor?.innerHTML || "";
    });
    leftColumn.appendChild(this.leftEditor);

    // Right column
    const rightColumn = document.createElement("div");
    rightColumn.classList.add("column-right");
    rightColumn.style.cssText = "padding: 10px; min-height: 100px;";
    
    this.rightEditor = document.createElement("div");
    this.rightEditor.contentEditable = "true";
    this.rightEditor.innerHTML = this.data.rightContent;
    this.rightEditor.style.cssText = "outline: none; min-height: 80px;";
    // Allow all paste types
    this.rightEditor.setAttribute("contenteditable", "true");
    
    // Add paste support for images
    this.rightEditor.addEventListener("paste", (e) => {
      this.handlePaste(e, this.rightEditor!);
    });
    
    // Add image link handlers
    this.addImageLinkHandlers(this.rightEditor);
    
    // Add image upload button
    const rightImageBtn = this.createImageButton(() => this.insertImage(this.rightEditor!));
    rightColumn.appendChild(rightImageBtn);
    
    this.rightEditor.addEventListener("input", () => {
      this.data.rightContent = this.rightEditor?.innerHTML || "";
    });
    rightColumn.appendChild(this.rightEditor);

    columnsContainer.appendChild(leftColumn);
    columnsContainer.appendChild(rightColumn);

    this.wrapper.appendChild(layoutContainer);
    this.wrapper.appendChild(columnsContainer);

    return this.wrapper;
  }

  private updateLayout(container?: HTMLElement) {
    const colsContainer = container || this.wrapper?.querySelector(".columns-container");
    if (!colsContainer) return;

    const leftCol = colsContainer.querySelector(".column-left") as HTMLElement;
    const rightCol = colsContainer.querySelector(".column-right") as HTMLElement;
    if (!leftCol || !rightCol) return;

    colsContainer.style.cssText = "display: grid; gap: 15px; margin-top: 10px;";

    switch (this.data.layout) {
      case "50-50":
        colsContainer.style.gridTemplateColumns = "1fr 1fr";
        break;
      case "33-67":
        colsContainer.style.gridTemplateColumns = "1fr 2fr";
        break;
      case "67-33":
        colsContainer.style.gridTemplateColumns = "2fr 1fr";
        break;
    }
  }

  private createImageButton(onClick: () => void): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = "📷 Insert Image";
    btn.style.cssText = "padding: 4px 8px; margin-bottom: 8px; font-size: 12px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer;";
    btn.addEventListener("click", onClick);
    return btn;
  }

  private addImageLinkHandlers(editor: HTMLElement) {
    // Add visual indicator for linked images
    const updateImageStyles = () => {
      const images = editor.querySelectorAll("img");
      images.forEach((img) => {
        const hasLink = img.parentElement?.tagName === "A";
        if (hasLink) {
          img.style.cssText = "max-width: 100%; height: auto; display: block; margin: 10px 0; cursor: pointer; border: 2px solid #4a90e2; border-radius: 4px;";
          img.title = "Click to edit link";
        } else {
          img.style.cssText = "max-width: 100%; height: auto; display: block; margin: 10px 0; cursor: pointer;";
          img.title = "Click to add link";
        }
      });
    };

    // Update styles on content change
    editor.addEventListener("input", updateImageStyles);
    editor.addEventListener("DOMNodeInserted", updateImageStyles);

    // Add click handler to images for adding/editing links
    editor.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        e.preventDefault();
        e.stopPropagation();
        this.handleImageClick(target as HTMLImageElement, editor);
        setTimeout(updateImageStyles, 100);
      }
    });

    // Also handle right-click for context menu
    editor.addEventListener("contextmenu", (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        e.preventDefault();
        this.showImageContextMenu(target as HTMLImageElement, e, editor);
      }
    });

    // Initial style update
    setTimeout(updateImageStyles, 100);
  }

  private handleImageClick(img: HTMLImageElement, editor: HTMLElement) {
    // Check if image already has a link
    const existingLink = img.parentElement?.tagName === "A" ? img.parentElement as HTMLAnchorElement : null;
    const currentUrl = existingLink?.href || "";

    const url = prompt("Enter link URL (leave empty to remove link):", currentUrl);
    
    if (url === null) return; // User cancelled

    if (url.trim() === "") {
      // Remove link
      if (existingLink) {
        const parent = existingLink.parentElement;
        if (parent) {
          parent.insertBefore(img, existingLink);
          existingLink.remove();
        } else {
          editor.insertBefore(img, existingLink);
          existingLink.remove();
        }
      }
    } else {
      // Add or update link
      if (existingLink) {
        existingLink.href = url;
        existingLink.target = "_blank";
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.style.cssText = "display: inline-block;";
        
        const parent = img.parentElement;
        if (parent) {
          parent.insertBefore(link, img);
          link.appendChild(img);
        } else {
          editor.insertBefore(link, img);
          link.appendChild(img);
        }
      }
    }

    this.updateContent();
  }

  private showImageContextMenu(img: HTMLImageElement, e: MouseEvent, editor: HTMLElement) {
    // Remove existing menu if any
    const existingMenu = document.querySelector(".image-context-menu");
    if (existingMenu) {
      existingMenu.remove();
    }

    const menu = document.createElement("div");
    menu.className = "image-context-menu";
    menu.style.cssText = `
      position: fixed;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 4px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 2px;
    `;

    const existingLink = img.parentElement?.tagName === "A" ? img.parentElement as HTMLAnchorElement : null;

    // Add/Edit Link button
    const linkBtn = document.createElement("button");
    linkBtn.textContent = existingLink ? "Edit Link" : "Add Link";
    linkBtn.style.cssText = `
      padding: 6px 12px;
      border: none;
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-size: 13px;
    `;
    linkBtn.addEventListener("mouseenter", () => {
      linkBtn.style.background = "#f3f4f6";
    });
    linkBtn.addEventListener("click", () => {
      this.handleImageClick(img, editor);
      menu.remove();
    });
    menu.appendChild(linkBtn);

    // Remove Link button (if link exists)
    if (existingLink) {
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove Link";
      removeBtn.style.cssText = linkBtn.style.cssText;
      removeBtn.addEventListener("mouseenter", () => {
        removeBtn.style.background = "#f3f4f6";
      });
      removeBtn.addEventListener("click", () => {
        const parent = existingLink.parentElement;
        if (parent) {
          parent.insertBefore(img, existingLink);
          existingLink.remove();
        } else {
          editor.insertBefore(img, existingLink);
          existingLink.remove();
        }
        this.updateContent();
        menu.remove();
      });
      menu.appendChild(removeBtn);
    }

    // Position menu
    menu.style.top = `${e.clientY}px`;
    menu.style.left = `${e.clientX}px`;
    document.body.appendChild(menu);

    // Remove menu when clicking outside
    setTimeout(() => {
      const removeMenu = (clickEvent: MouseEvent) => {
        if (!menu.contains(clickEvent.target as Node)) {
          menu.remove();
          document.removeEventListener("click", removeMenu);
        }
      };
      document.addEventListener("click", removeMenu);
    }, 0);
  }

  private updateContent() {
    this.data.leftContent = this.leftEditor?.innerHTML || "";
    this.data.rightContent = this.rightEditor?.innerHTML || "";
    
    // Update image styles after content change
    setTimeout(() => {
      this.updateImageStyles(this.leftEditor!);
      this.updateImageStyles(this.rightEditor!);
    }, 50);
  }

  private updateImageStyles(editor: HTMLElement) {
    const images = editor.querySelectorAll("img");
    images.forEach((img) => {
      const hasLink = img.parentElement?.tagName === "A";
      if (hasLink) {
        img.style.cssText = "max-width: 100%; height: auto; display: block; margin: 10px 0; cursor: pointer; border: 2px solid #4a90e2; border-radius: 4px;";
        img.title = "Click to edit link";
      } else {
        img.style.cssText = "max-width: 100%; height: auto; display: block; margin: 10px 0; cursor: pointer;";
        img.title = "Click to add link";
      }
    });
  }

  private insertImage(editor: HTMLElement) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target?.result as string;
        img.style.cssText = "max-width: 100%; height: auto; display: block; margin: 10px 0;";
        
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        if (range) {
          range.insertNode(img);
        } else {
          editor.appendChild(img);
        }
        
        this.data.leftContent = this.leftEditor?.innerHTML || "";
        this.data.rightContent = this.rightEditor?.innerHTML || "";
      };
      reader.readAsDataURL(file);
    };
  }

  private handlePaste(e: ClipboardEvent, editor: HTMLElement) {
    const items = e.clipboardData?.items;
    if (!items) return;

    // Check if there's an image in the clipboard
    let hasImage = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        hasImage = true;
        break;
      }
    }

    // Only handle images, let text paste normally
    if (hasImage) {
      e.preventDefault();
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const img = document.createElement("img");
              img.src = event.target?.result as string;
              img.style.cssText = "max-width: 100%; height: auto; display: block; margin: 10px 0;";
              
              const selection = window.getSelection();
              if (selection?.rangeCount) {
                const range = selection.getRangeAt(0);
                range.insertNode(img);
              } else {
                editor.appendChild(img);
              }
              
              this.data.leftContent = this.leftEditor?.innerHTML || "";
              this.data.rightContent = this.rightEditor?.innerHTML || "";
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    }
    // If no image, let the default paste behavior happen (for text)
  }

  save(): ColumnsData {
    return {
      leftContent: this.leftEditor?.innerHTML || "",
      rightContent: this.rightEditor?.innerHTML || "",
      layout: this.layoutSelect?.value as ColumnsData["layout"] || "50-50",
    };
  }

  static get sanitize() {
    return {
      leftContent: {
        br: true,
        p: true,
        strong: true,
        em: true,
        u: true,
        a: {
          href: true,
          target: "_blank",
        },
        img: {
          src: true,
          alt: true,
          style: true,
          width: true,
          height: true,
        },
        iframe: {
          src: true,
          frameborder: true,
          allow: true,
          allowfullscreen: true,
          style: true,
        },
        ul: true,
        ol: true,
        li: true,
        div: {
          style: true,
          class: true,
        },
      },
      rightContent: {
        br: true,
        p: true,
        strong: true,
        em: true,
        u: true,
        a: {
          href: true,
          target: "_blank",
        },
        img: {
          src: true,
          alt: true,
          style: true,
          width: true,
          height: true,
        },
        iframe: {
          src: true,
          frameborder: true,
          allow: true,
          allowfullscreen: true,
          style: true,
        },
        ul: true,
        ol: true,
        li: true,
        div: {
          style: true,
          class: true,
        },
      },
      layout: {},
    };
  }
}

