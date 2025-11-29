/**
 * YouTube Video Block for Editor.js
 * Allows embedding YouTube videos by URL
 */

import type { BlockTool, BlockToolConstructorOptions, BlockToolData } from "@editorjs/editorjs";

export interface YouTubeVideoData extends BlockToolData {
  url: string;
  caption?: string;
}

export default class YouTubeVideoBlock implements BlockTool {
  private data: YouTubeVideoData;
  private wrapper: HTMLElement | null = null;
  private urlInput: HTMLInputElement | null = null;
  private captionInput: HTMLInputElement | null = null;

  static get toolbox() {
    return {
      title: "YouTube Video",
      icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.615 3.184c-0.224-0.832-0.89-1.497-1.722-1.722C16.254 1 10 1 10 1S3.746 1 2.107 1.462c-0.832 0.225-1.498 0.89-1.722 1.722C0 4.746 0 10 0 10s0 5.254 0.385 6.816c0.224 0.832 0.89 1.497 1.722 1.722C3.746 19 10 19 10 19s6.254 0 7.893-0.462c0.832-0.225 1.498-0.89 1.722-1.722C20 15.254 20 10 20 10s0-5.254-0.385-6.816zM8 13.5V6.5l5.5 3.5L8 13.5z" fill="currentColor"/></svg>',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor({ data }: BlockToolConstructorOptions<YouTubeVideoData>) {
    this.data = {
      url: data?.url || "",
      caption: data?.caption || "",
    };
  }

  render(): HTMLElement {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("youtube-video-block");
    this.wrapper.style.cssText = "padding: 10px; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px 0;";

    // URL input
    const urlContainer = document.createElement("div");
    urlContainer.style.cssText = "margin-bottom: 10px;";
    
    const urlLabel = document.createElement("label");
    urlLabel.textContent = "YouTube URL:";
    urlLabel.style.cssText = "display: block; font-size: 12px; font-weight: 500; margin-bottom: 4px;";
    
    this.urlInput = document.createElement("input");
    this.urlInput.type = "text";
    this.urlInput.value = this.data.url;
    this.urlInput.placeholder = "https://www.youtube.com/watch?v=... or https://youtu.be/...";
    this.urlInput.style.cssText = "width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;";
    this.urlInput.addEventListener("input", () => {
      this.data.url = this.urlInput?.value || "";
      this.updatePreview();
    });

    urlContainer.appendChild(urlLabel);
    urlContainer.appendChild(this.urlInput);

    // Caption input
    const captionContainer = document.createElement("div");
    captionContainer.style.cssText = "margin-bottom: 10px;";
    
    const captionLabel = document.createElement("label");
    captionLabel.textContent = "Caption (optional):";
    captionLabel.style.cssText = "display: block; font-size: 12px; font-weight: 500; margin-bottom: 4px;";
    
    this.captionInput = document.createElement("input");
    this.captionInput.type = "text";
    this.captionInput.value = this.data.caption || "";
    this.captionInput.placeholder = "Video caption";
    this.captionInput.style.cssText = "width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;";
    this.captionInput.addEventListener("input", () => {
      this.data.caption = this.captionInput?.value || "";
    });

    captionContainer.appendChild(captionLabel);
    captionContainer.appendChild(this.captionInput);

    // Preview container
    const previewContainer = document.createElement("div");
    previewContainer.className = "youtube-preview";
    previewContainer.style.cssText = "margin-top: 10px;";

    this.wrapper.appendChild(urlContainer);
    this.wrapper.appendChild(captionContainer);
    this.wrapper.appendChild(previewContainer);

    this.updatePreview();

    return this.wrapper;
  }

  private updatePreview() {
    const previewContainer = this.wrapper?.querySelector(".youtube-preview");
    if (!previewContainer) return;

    const url = this.data.url;
    if (!url) {
      previewContainer.innerHTML = "";
      return;
    }

    const videoId = this.extractVideoId(url);
    if (!videoId) {
      previewContainer.innerHTML = '<p style="color: red; font-size: 12px;">Invalid YouTube URL</p>';
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    previewContainer.innerHTML = `
      <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000; border-radius: 4px;">
        <iframe 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
          src="${embedUrl}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

  private extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }

  save(): YouTubeVideoData {
    return {
      url: this.urlInput?.value || "",
      caption: this.captionInput?.value || "",
    };
  }

  static get sanitize() {
    return {
      url: {},
      caption: {},
    };
  }
}

