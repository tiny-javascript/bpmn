let MIN_PADDING = 20;
const DIRECTION_NORTH = 'north';
const DIRECTION_SOUTH = 'south';
const DIRECTION_EAST = 'east';
const DIRECTION_WEST = 'west';
const DIRECTION_SOUTHEAST = 'southeast';
const DIRECTION_NORTHEAST = 'northeast';
const DIRECTION_SOUTHWEST = 'southwest';
const DIRECTION_NORTHWEST = 'northwest';
/**
 * 计算结束点相对于开始点的方位
 */
function calcPostion(sx, sy, ex, ey) {
    let direction = '';
    // 正东
    if (sx < ex && sy == ey) {
        direction = DIRECTION_EAST;
    }
    // 正西
    if (sx > ex && sy == ey) {
        direction = DIRECTION_WEST;
    }
    // 正南
    if (sx == ex && sy < ey) {
        direction = DIRECTION_SOUTH;
    }
    // 正北
    if (sx == ex && sy > ey) {
        direction = DIRECTION_NORTH;
    }
    // 东南
    if (sx < ex && sy < ey) {
        direction = DIRECTION_SOUTHEAST;
    }
    // 东北
    if (sx < ex && sy > ey) {
        direction = DIRECTION_NORTHEAST;
    }
    // 西南
    if (sx > ex && sy < ey) {
        direction = DIRECTION_SOUTHWEST;
    }
    // 西北
    if (sx > ex && sy > ey) {
        direction = DIRECTION_NORTHWEST;
    }
    return direction;
}
/**
 * 根据方位和连接对象计算偏移量
 */
function calcOffset(startElement, endElement, position) {
    let offset = 0;
    switch (position) {
        case DIRECTION_NORTH:
            break;
        case DIRECTION_SOUTH:
            break;
        case DIRECTION_EAST:
            break;
        case DIRECTION_WEST:
            break;
        case DIRECTION_SOUTHEAST:
            break;
        case DIRECTION_NORTHEAST:
            break;
        case DIRECTION_SOUTHWEST:
            break;
        case DIRECTION_NORTHWEST:
            break;
    }
    return offset;
}
/*从上面开始*/
function createLinePointsFromNorthToNorth(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    switch (position) {
        case DIRECTION_EAST:
        case DIRECTION_WEST:
        case DIRECTION_SOUTHEAST:
        case DIRECTION_SOUTHWEST:
            tmp = tmp.concat([
                sx, sy - MIN_PADDING
            ]);
            tmp = tmp.concat([
                ex, sy - MIN_PADDING
            ]);
            break;
        case DIRECTION_NORTH:
        case DIRECTION_SOUTH:
        case DIRECTION_NORTHEAST:
        case DIRECTION_NORTHWEST:
            tmp = tmp.concat([
                sx, ey - MIN_PADDING
            ]);
            tmp = tmp.concat([
                ex, ey - MIN_PADDING
            ]);
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromNorthToEast(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createBottomPoints = () => {
        tmp = tmp.concat([
            sx, sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            ey
        ]);
    }
    const createRightPoints = () => {
        tmp = tmp.concat([
            sx, sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            ey
        ]);
    }
    switch (position) {
        case DIRECTION_EAST:
        case DIRECTION_WEST:
        case DIRECTION_SOUTH:
        case DIRECTION_SOUTHEAST:
        case DIRECTION_SOUTHWEST:
            createBottomPoints();
            break;
        case DIRECTION_NORTH:
        case DIRECTION_NORTHEAST:
            createRightPoints();
            break;
        case DIRECTION_NORTHWEST:
            if (sy - ey < MIN_PADDING) {
                createBottomPoints();
            } else if (sx - ex < MIN_PADDING) {
                createRightPoints();
            } else {
                tmp = tmp.concat([sx, ey]);
            }
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromNorthToSouth(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createBottomPoints = () => {
        tmp = tmp.concat([
            sx, sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            ey + MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex, ey + MIN_PADDING
        ]);
    }
    switch (position) {
        case DIRECTION_EAST:
        case DIRECTION_WEST:
        case DIRECTION_NORTH:
        case DIRECTION_SOUTH:
        case DIRECTION_SOUTHEAST:
        case DIRECTION_SOUTHWEST:
            createBottomPoints();
            break;
        case DIRECTION_NORTHEAST:
        case DIRECTION_NORTHWEST:
            if (sy - ey >= MIN_PADDING) {
                tmp = tmp.concat([
                    sx, sy - (sy - ey) / 2
                ]);
                tmp = tmp.concat([
                    ex, sy - (sy - ey) / 2
                ]);
            } else {
                createBottomPoints();
            }
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromNorthToWest(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createBottomPoints = () => {
        tmp = tmp.concat([
            sx, sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex - MIN_PADDING,
            sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex - MIN_PADDING,
            ey
        ]);
    }
    const createLeftPoints = () => {
        tmp = tmp.concat([
            sx, sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex - MIN_PADDING,
            sy - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex - MIN_PADDING,
            ey
        ]);
    }
    switch (position) {
        case DIRECTION_EAST:
        case DIRECTION_WEST:
        case DIRECTION_SOUTH:
        case DIRECTION_SOUTHEAST:
        case DIRECTION_SOUTHWEST:
            createBottomPoints();
            break;
        case DIRECTION_NORTH:
        case DIRECTION_NORTHEAST:
            if (sy - ey < MIN_PADDING) {
                createBottomPoints();
            } else if (ex - sx < MIN_PADDING) {
                createLeftPoints();
            } else {
                tmp = tmp.concat([sx, ey]);
            }
            break;
        case DIRECTION_NORTHWEST:
            createLeftPoints();
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
/*从右面开始*/
function createLinePointsFromEastToNorth(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createTopPoints = () => {
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            sy
        ]);
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            ey - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex, ey - MIN_PADDING
        ]);
    }
    const createRightPoints = () => {
        tmp = tmp.concat([
            sx + MIN_PADDING,
            sy
        ]);
        tmp = tmp.concat([
            sx + MIN_PADDING,
            ey - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex, ey - MIN_PADDING
        ]);
    }
    switch (position) {
        case DIRECTION_NORTH:
        case DIRECTION_NORTHEAST:
            if (ex - sx <= 2 * MIN_PADDING) {
                createRightPoints();
            } else {
                createTopPoints();
            }
            break;
        case DIRECTION_SOUTH:
        case DIRECTION_WEST:
        case DIRECTION_SOUTHWEST:
        case DIRECTION_NORTHWEST:
            createRightPoints();
            break;
        case DIRECTION_EAST:
        case DIRECTION_SOUTHEAST:
            if (ex - sx <= MIN_PADDING) {
                createRightPoints();
            } else if (ey - sy <= MIN_PADDING) {
                createTopPoints();
            } else {
                tmp = tmp.concat([ex, sy]);
            }
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromEastToEast(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    switch (position) {
        case DIRECTION_NORTH:
        case DIRECTION_EAST:
        case DIRECTION_SOUTH:
        case DIRECTION_SOUTHEAST:
        case DIRECTION_NORTHEAST:
            tmp = tmp.concat([
                ex + MIN_PADDING,
                sy
            ]);
            tmp = tmp.concat([
                ex + MIN_PADDING,
                ey
            ]);
            break;
        case DIRECTION_WEST:
        case DIRECTION_SOUTHWEST:
        case DIRECTION_NORTHWEST:
            tmp = tmp.concat([
                sx + MIN_PADDING,
                sy
            ]);
            tmp = tmp.concat([
                sx + MIN_PADDING,
                ey
            ]);
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromEastToSouth(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createRightPoints = () => {
        tmp = tmp.concat([
            sx + MIN_PADDING,
            sy
        ]);
        tmp = tmp.concat([
            sx + MIN_PADDING,
            ey + MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex, ey + MIN_PADDING
        ]);
    }
    const createBottomPoints = () => {
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            sy
        ]);
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            ey + MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex, ey + MIN_PADDING
        ]);
    }
    switch (position) {
        case DIRECTION_NORTH:
        case DIRECTION_EAST:
        case DIRECTION_NORTHEAST:
            if (sy - ey < MIN_PADDING) {
                createBottomPoints();
            } else if (ex - sx < MIN_PADDING) {
                createRightPoints();
            } else {
                tmp = tmp.concat([ex, sy]);
            }
            break;
        case DIRECTION_SOUTH:
        case DIRECTION_SOUTHEAST:
            if (ex - sx < 2 * MIN_PADDING) {
                createRightPoints();
            } else {
                createBottomPoints();
            }
            break;
        case DIRECTION_WEST:
        case DIRECTION_SOUTHWEST:
        case DIRECTION_NORTHWEST:
            createRightPoints();
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromEastToWest(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createRightPoints = () => {
        tmp = tmp.concat([
            sx + MIN_PADDING,
            sy
        ]);
        tmp = tmp.concat([
            sx + MIN_PADDING,
            sy + (ey - sy) / 2
        ]);
        tmp = tmp.concat([
            ex - MIN_PADDING,
            sy + (ey - sy) / 2
        ]);
        tmp = tmp.concat([
            ex - MIN_PADDING,
            ey
        ]);
    }
    switch (position) {
        case DIRECTION_NORTH:
        case DIRECTION_EAST:
        case DIRECTION_SOUTH:
        case DIRECTION_NORTHEAST:
        case DIRECTION_SOUTHEAST:
            if (ex - sx < 2 * MIN_PADDING) {
                createRightPoints();
            } else {
                tmp = tmp.concat([
                    sx + (ex - sx) / 2,
                    sy
                ]);
                tmp = tmp.concat([
                    sx + (ex - sx) / 2,
                    ey
                ]);
            }
            break;
        case DIRECTION_WEST:
        case DIRECTION_SOUTHWEST:
        case DIRECTION_NORTHWEST:
            createRightPoints();
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
/*从下面开始*/
function createLinePointsFromSouthToNorth(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createTopPoints = () => {
        tmp = tmp.concat([
            sx, sy + MIN_PADDING
        ]);
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            sy + MIN_PADDING
        ]);
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            ey - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex, ey - MIN_PADDING
        ]);
    }
    switch (position) {
        case DIRECTION_EAST:
        case DIRECTION_SOUTH:
        case DIRECTION_WEST:
        case DIRECTION_SOUTHEAST:
        case DIRECTION_SOUTHWEST:
            if (ey - sy < 2 * MIN_PADDING) {
                createTopPoints();
            } else {
                tmp = tmp.concat([
                    sx, sy + (ey - sy) / 2
                ]);
                tmp = tmp.concat([
                    ex, sy + (ey - sy) / 2
                ]);
            }
            break;
        case DIRECTION_NORTH:
        case DIRECTION_NORTHEAST:
        case DIRECTION_NORTHWEST:
            createTopPoints();
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromSouthToEast(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createTopPoints = () => {
        tmp = tmp.concat([
            sx, sy + MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            sy + MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            ey
        ]);
    }
    const createRightPoints = () => {
        tmp = tmp.concat([
            sx, sy + (ey - sy) / 2
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            sy + (ey - sy) / 2
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            ey
        ]);
    }
    switch (position) {
        case DIRECTION_NORTH:
        case DIRECTION_EAST:
        case DIRECTION_WEST:
        case DIRECTION_NORTHEAST:
        case DIRECTION_NORTHWEST:
            createTopPoints();
            break;
        case DIRECTION_SOUTHEAST:
            createRightPoints();
            break;
        case DIRECTION_SOUTH:
        case DIRECTION_SOUTHWEST:
            if (sx - ex < MIN_PADDING) {
                createRightPoints();
            } else if (ey - sy < MIN_PADDING) {
                createTopPoints();
            } else {
                tmp = tmp.concat([sx, ey]);
            }
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromSouthToSouth(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    switch (position) {
        case DIRECTION_WEST:
        case DIRECTION_EAST:
        case DIRECTION_NORTH:
        case DIRECTION_NORTHEAST:
        case DIRECTION_NORTHWEST:
            tmp = tmp.concat([
                sx, sy + MIN_PADDING
            ]);
            tmp = tmp.concat([
                ex, sy + MIN_PADDING
            ]);
            break;
        case DIRECTION_SOUTH:
        case DIRECTION_SOUTHEAST:
        case DIRECTION_SOUTHWEST:
            tmp = tmp.concat([
                sx, ey + MIN_PADDING
            ]);
            tmp = tmp.concat([
                ex, ey + MIN_PADDING
            ]);
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromSouthToWest(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createTopPoints = () => {
        tmp = tmp.concat([
            sx, sy + MIN_PADDING
        ]);
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            sy + MIN_PADDING
        ]);
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            ey
        ]);
    }
    const createLeftPoints = () => {
        tmp = tmp.concat([
            sx, sy + MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex - MIN_PADDING,
            sy + MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex - MIN_PADDING,
            ey
        ]);
    }
    switch (position) {
        case DIRECTION_EAST:
        case DIRECTION_NORTH:
        case DIRECTION_SOUTH:
        case DIRECTION_NORTHEAST:
            createTopPoints();
            break;
        case DIRECTION_WEST:
        case DIRECTION_SOUTHWEST:
        case DIRECTION_NORTHWEST:
            createLeftPoints();
            break;
        case DIRECTION_SOUTHEAST:
            if (ex - sx < MIN_PADDING) {
                createLeftPoints();
            } else if (ey - sy < MIN_PADDING) {
                createTopPoints();
            } else {
                tmp = tmp.concat([sx, ey]);
            }
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
/*从左面开始*/
function createLinePointsFromWestToNorth(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createBottomPoints = () => {
        tmp = tmp.concat([
            sx - MIN_PADDING,
            sy
        ]);
        tmp = tmp.concat([
            sx - MIN_PADDING,
            sy + (ey - sy) / 2
        ]);
        tmp = tmp.concat([
            ex, sy + (ey - sy) / 2
        ]);
    }
    const createTopPoints = () => {
        tmp = tmp.concat([
            sx - MIN_PADDING,
            sy
        ]);
        tmp = tmp.concat([
            sx - MIN_PADDING,
            ey - MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex, ey - MIN_PADDING
        ]);
    }
    switch (position) {
        case DIRECTION_WEST:
        case DIRECTION_NORTHWEST:
            if (sx - ex < 2 * MIN_PADDING) {
                createTopPoints();
            } else {
                tmp = tmp.concat([
                    sx + (ex - sx) / 2,
                    sy
                ]);
                tmp = tmp.concat([
                    sx + (ex - sx) / 2,
                    ey - MIN_PADDING
                ]);
                tmp = tmp.concat([
                    ex, ey - MIN_PADDING
                ]);
            }
            break;
        case DIRECTION_EAST:
        case DIRECTION_NORTH:
        case DIRECTION_NORTHEAST:
            createTopPoints();
            break;
        case DIRECTION_SOUTH:
        case DIRECTION_SOUTHEAST:
            if (ey - sy <= MIN_PADDING) {
                createTopPoints();
            } else {
                createBottomPoints();
            }
            break;
        case DIRECTION_SOUTHWEST:
            if (sx - ex < MIN_PADDING) {
                createBottomPoints();
            } else {
                tmp = tmp.concat([ex, sy]);
            }
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromWestToEast(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    const createRightPoints = () => {
        tmp = tmp.concat([
            sx - MIN_PADDING,
            sy
        ]);
        tmp = tmp.concat([
            sx - MIN_PADDING,
            sy + (ey - sy) / 2
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            sy + (ey - sy) / 2
        ]);
        tmp = tmp.concat([
            ex + MIN_PADDING,
            ey
        ]);
    }
    switch (position) {
        case DIRECTION_EAST:
        case DIRECTION_NORTH:
        case DIRECTION_SOUTH:
        case DIRECTION_NORTHEAST:
        case DIRECTION_SOUTHEAST:
            createRightPoints();
            break;
        case DIRECTION_WEST:
        case DIRECTION_SOUTHWEST:
        case DIRECTION_NORTHWEST:
            if (sx - ex < 2 * MIN_PADDING) {
                createRightPoints();
            } else {
                tmp = tmp.concat([
                    sx + (ex - sx) / 2,
                    sy
                ]);
                tmp = tmp.concat([
                    sx + (ex - sx) / 2,
                    ey
                ]);
            }
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromWestToSouth(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    // 左上角
    const createTopPoints = () => {
        tmp = tmp.concat([
            sx - MIN_PADDING,
            sy
        ]);
        tmp = tmp.concat([
            sx - MIN_PADDING,
            sy + (ey - sy) / 2
        ]);
        tmp = tmp.concat([
            ex, sy + (ey - sy) / 2
        ]);
    }
    // 左下角
    const createRightPoints = () => {
        tmp = tmp.concat([
            sx - MIN_PADDING,
            sy
        ]);
        tmp = tmp.concat([
            sx - MIN_PADDING,
            ey + MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex, ey + MIN_PADDING
        ]);
    };
    // 右下角
    const createBottomPoints = () => {
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            sy
        ]);
        tmp = tmp.concat([
            sx + (ex - sx) / 2,
            ey + MIN_PADDING
        ]);
        tmp = tmp.concat([
            ex, ey + MIN_PADDING
        ]);
    }
    switch (position) {
        case DIRECTION_WEST:
        case DIRECTION_NORTH:
        case DIRECTION_NORTHWEST:
            if (sx - ex < MIN_PADDING) {
                createTopPoints();
            } else if (sy - ey < MIN_PADDING) {
                createBottomPoints();
            } else {
                tmp = tmp.concat([ex, sy]);
            }
            break;
        case DIRECTION_EAST:
        case DIRECTION_NORTHEAST:
            if (sy - ey < 2 * MIN_PADDING) {
                createRightPoints();
            } else {
                createTopPoints();
            }
            break;
        case DIRECTION_SOUTH:
        case DIRECTION_SOUTHEAST:
            createRightPoints();
            break;
        case DIRECTION_SOUTHWEST:
            if (sx - ex < 2 * MIN_PADDING) {
                createRightPoints();
            } else {
                createBottomPoints();
            }
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createLinePointsFromWestToWest(sx, sy, ex, ey, position, offset) {
    let tmp = [];
    switch (position) {
        case DIRECTION_EAST:
        case DIRECTION_NORTH:
        case DIRECTION_SOUTH:
        case DIRECTION_NORTHEAST:
        case DIRECTION_SOUTHEAST:
            tmp = tmp.concat([
                sx - MIN_PADDING,
                sy
            ]);
            tmp = tmp.concat([
                sx - MIN_PADDING,
                ey
            ]);
            break;
        case DIRECTION_WEST:
        case DIRECTION_NORTHWEST:
        case DIRECTION_SOUTHWEST:
            tmp = tmp.concat([
                ex - MIN_PADDING,
                sy
            ]);
            tmp = tmp.concat([
                ex - MIN_PADDING,
                ey
            ]);
            break;
    }
    return [sx, sy].concat(tmp).concat([ex, ey]);
}
function createExecuteFunc(direction) {
    let func = null;
    switch (direction) {
        case 'n2n':
            func = createLinePointsFromNorthToNorth;
            break;
        case 'n2e':
            func = createLinePointsFromNorthToEast;
            break;
        case 'n2s':
            func = createLinePointsFromNorthToSouth;
            break;
        case 'n2w':
            func = createLinePointsFromNorthToWest;
            break;
        case 'e2n':
            func = createLinePointsFromEastToNorth;
            break;
        case 'e2e':
            func = createLinePointsFromEastToEast;
            break;
        case 'e2s':
            func = createLinePointsFromEastToSouth;
            break;
        case 'e2w':
            func = createLinePointsFromEastToWest;
            break;
        case 's2n':
            func = createLinePointsFromSouthToNorth;
            break;
        case 's2e':
            func = createLinePointsFromSouthToEast;
            break;
        case 's2s':
            func = createLinePointsFromSouthToSouth;
            break;
        case 's2w':
            func = createLinePointsFromSouthToWest;
            break;
        case 'w2n':
            func = createLinePointsFromWestToNorth;
            break;
        case 'w2e':
            func = createLinePointsFromWestToEast;
            break;
        case 'w2s':
            func = createLinePointsFromWestToSouth;
            break;
        case 'w2w':
            func = createLinePointsFromWestToWest;
            break;
    }
    return func;
}
/**
 * 创建连接线坐标点
 * @param  {[type]} startAxis    [description]
 * @param  {[type]} startElement [description]
 * @param  {[type]} startPoint   [description]
 * @return {[type]}              [description]
 */
function createLinePoints(startAxis, startElement, startPoint) {
    return function(endAxis, endElement, endPoint) {
        const type = startPoint.substr(0, 1) + '2' + endPoint.substr(0, 1);
        return function() {
            const sx = startAxis[0];
            const sy = startAxis[1];
            const ex = endAxis[0];
            const ey = endAxis[1];
            if (Math.abs(ex - sx) < 50 && Math.abs(ey - sy) < 50) {
                MIN_PADDING = 0;
            } else {
                MIN_PADDING = 20;
            }
            const position = calcPostion(sx, sy, ex, ey);
            const offset = calcOffset(startElement, endElement, position);
            return createExecuteFunc(type)(sx, sy, ex, ey, position, offset);
        }
    }
}
export {createLinePoints, calcPostion};
