
export abstract class AuditObject {



  createdAt!: Date;



  updatedAt!: Date;


  setCreatedAt(): void {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }


  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}
