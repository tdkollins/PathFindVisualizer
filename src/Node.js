class Node {
  constructor(x, y, neighbourIdList, id, groupId) {
    this.x = x;
    this.y = y;
    this.neighbours = neighbourIdList;
    this.neighbourGroups = [];
    this.id = id;
    this.groupId = groupId;

    for (let i = 0; i < this.neighbours.length; i++) {
      if (!this.neighbourGroups.includes(Math.floor(this.neighbours[i] / 150) * 150)) {
        this.neighbourGroups.push(Math.floor(this.neighbours[i] / 150) * 150)
      }
    }
  }

  hover(mx, my) {
    const nodeRadius = 50;
    const dx = Math.abs(this.x - mx);
    const dy = Math.abs(this.y - my);
    return ((dx * dx) + (dy * dy) < nodeRadius * nodeRadius + 1000);
  }

  updateNeighbours(neighbour) {
    if (this.neighbours.includes(neighbour)) {
      return;
    }
    this.neighbours.push(neighbour);
    return;
  }
}

export default Node
