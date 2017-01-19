export function getVirtualConnecterPointPosition(source, vx, vy) {
    const {x, y, width, height} = source.data.props;
    let pos = 'west';
    if (vx <= x) {
        pos = 'east';
    } else if (vx >= x + width) {
        pos = 'west';
    } else {
        if (vy <= y) {
            pos = 'south';
        } else if (vy >= y + height) {
            pos = 'north';
        }
    }
    return pos;
}
export function getRatios(element) {
    const {x, y, width, height} = element;
    const ox = x + width / 2;
    const oy = y + height / 2;
    const points = [
        [
            x + width,
            y
        ],
        [
            x, y
        ],
        [
            x, y + height
        ],
        [
            x + width,
            y + height
        ]
    ];
    const ratios = points.map(point => {
        const dx = point[0] - ox;
        const dy = point[1] - oy;
        return Math.atan2(dy, dx) * 180 / Math.PI;
    });
    return [ratios[3], ratios[2]];
}
export function getPositionByArea(element, ratios, lx, ly) {
    const {x, y, width, height} = element;
    const dx = lx - (x + width / 2);
    const dy = ly - (y + height / 2);
    const ratio = Math.atan2(dy, dx) * 180 / Math.PI;
    const absRatio = Math.abs(ratio);
    let pos = 'north';
    if (absRatio >= 0 && absRatio <= ratios[0]) {
        pos = 'east';
    } else if (absRatio >= ratios[1] && absRatio <= 180) {
        pos = 'west'
    } else if (ratio > 0) {
        pos = 'south';
    }
    return pos;
}
