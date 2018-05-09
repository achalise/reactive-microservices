function listNode(val) {
    this.val = val;
    this.next = null;
}

var mergeLists = function (l1, l2) {
    if (l1 && !l2) {
        return l1;
    }
    if (!l1 && l2) {
        return l2;
    }

    if (l1.val < l2.val) {
        l1.next = mergeLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeLists(l1, l2.next);
        return l2
    }
}

var l1 = new listNode(2);
l1.next = new listNode(3);
l1.next.next = new listNode(6);

var l2 = new listNode(4);
l2.next = new listNode(5);

var merged = mergeLists();
console.log(merged);