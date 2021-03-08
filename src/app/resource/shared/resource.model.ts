export class ResourceAlert {
  success: string | undefined;
  error: string | undefined;
}

export class Resource {
  static readonly types = ["book", "blog", "video"];

  // @ts-ignore
  _id: string;
  title: string;
  description: string;
  link: string;
  type: string;

  constructor({ title = '', description = '', link = '', type = '' } = {}) {
    this.title = title;
    this.description = description;
    this.link = link;
    this.type = type;
  }
}