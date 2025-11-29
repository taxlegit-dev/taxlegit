/**
 * Custom Editor.js block for side-by-side columns layout
 * Allows creating 2-column layouts with content in each column
 */

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

  constructor({ data, api, readOnly }: BlockToolConstructorOptions<ColumnsData>) {
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
    
    // Add paste support for images
    this.leftEditor.addEventListener("paste", (e) => {
      this.handlePaste(e, this.leftEditor!);
    });
    
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
    
    // Add paste support for images
    this.rightEditor.addEventListener("paste", (e) => {
      this.handlePaste(e, this.rightEditor!);
    });
    
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

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        e.preventDefault();
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

