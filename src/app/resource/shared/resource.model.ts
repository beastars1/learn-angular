export class ResourceAlert {
  success: string | undefined;
  error: string | undefined;
}

export class Resource {
  static readonly types = ["book", "blog", "video"];

  _id: string;
  title: string;
  description: string;
  link: string;
  type: string;

  constructor({ _id = '', title = '', description = '', link = '', type = '' } = {}) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.link = link;
    this.type = type;
  }
}