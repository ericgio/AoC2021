let values = "start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end\n";

// Test 2
values =
  "dc-end\nHN-start\nstart-kj\ndc-start\ndc-HN\nLN-dc\nHN-end\nkj-sa\nkj-HN\nkj-dc\n";

// Test 3
// values =
//   "fs-end\nhe-DX\nfs-he\nstart-DX\npj-DX\nend-zg\nzg-sl\nzg-pj\npj-he\nRW-he\nfs-DX\npj-RW\nzg-RW\nstart-pj\nhe-WI\nzg-he\npj-fs\nstart-RW\n";

// REAL
// values =
//   "XW-ed\ncc-tk\neq-ed\nns-eq\ncc-ed\nLA-kl\nII-tk\nLA-end\nend-II\nSQ-kl\ncc-kl\nXW-eq\ned-LA\nXW-tk\ncc-II\ntk-LA\neq-II\nSQ-start\nLA-start\nXW-end\ned-tk\neq-JR\nstart-kl\ned-II\nSQ-tk\n";

export default values.trim().split("\n");
