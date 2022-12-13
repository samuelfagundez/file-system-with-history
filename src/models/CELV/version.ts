import { v4 as id_gen } from "uuid";

import { Node } from "../Node";

export class Version {
  public id: string;
  public root: Node;
  public operations: string[];
  public last_version: string | null;

  constructor(node: Node) {
    this.id = id_gen();
    this.root = node;
    this.operations = [];
    this.last_version = null;
  }
}