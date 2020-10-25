import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {RemoveChildNodesOptionsInterface} from '../interface/ngx-worker.interface';

@Injectable({
  providedIn: 'root'
})
export class RendererWorker {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createElement(htmlTagName: string,
                cssClassName?: string | string[]
  ): HTMLElement {
    const el = this.renderer.createElement(htmlTagName);
    if (Object.prototype.toString.call(cssClassName) === '[object String]') {
      cssClassName = (cssClassName as string).trim().split(' ');
    }

    if (Object.prototype.toString.call(cssClassName) !== '[object Array]') {
      cssClassName = [];
    }

    (cssClassName as string[])
      .map((str) => str.trim())
      .filter((str) => str.length > 0)
      .forEach((cls: string) => this.renderer.addClass(el, cls));

    return el;
  }

  // childNode has precedence over index or default behaviour
  // nodeName and index will only remove a node at x index with the y name
  // under default behaviour, nodeName will filter out all nodes with a name different than y
  removeChildNodes(parent: HTMLElement, options: RemoveChildNodesOptionsInterface = {}): void {
    const {index, nodeName, childNode} = options;

    if (childNode) {
      this.renderer.removeChild(parent, childNode);
    } else if (Object.prototype.toString.call(index) === '[object Number]') {
      if (index >= parent.childNodes.length) {
        return;
      }

      const node = parent.childNodes[index];
      if (nodeName && node.nodeName.toLowerCase() !== nodeName.toLowerCase()) {
        return;
      }

      this.renderer.removeChild(parent, node);
    } else {
      [].slice
        .call(parent.childNodes)
        .filter(
          (node: ChildNode) => {
            return !(nodeName && node.nodeName.toLowerCase() !== nodeName.toLowerCase());
          }
        )
        .reverse()
        .forEach(
          (node: ChildNode) => {
            this.renderer.removeChild(parent, node);
          }
        );
    }
  }
}
