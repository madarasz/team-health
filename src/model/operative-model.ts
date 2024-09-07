export class OperativeModel {
  constructor(
    public id: number,
    public team: number,
    public name: string,
    public maxWounds: number,
    public currentWounds: number,
    public description?: string,
    public leader?: boolean,
    public active?: boolean
  ) {}
}
