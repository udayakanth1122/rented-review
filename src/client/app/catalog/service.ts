module serviceCatalog.catalog {
  export class Service {
    title: string;
    owner: string;
    versions: Array<Version>;
  }

  export class Version {
    active: boolean;
    number: string;
  }
}
