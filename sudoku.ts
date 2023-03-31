type SudokuBoard = {
    cells : number[][];
}
var board : SudokuBoard= {
        cells: [
        [1,7,9],[8,4,3],[2,6,5],
        [3,4,6],[2,5,9],[7,8,1],
        [5,8,2],[1,6,7],[3,9,4],

        [2,9,3],[7,8,1],[4,5,6],
        [8,1,4],[6,3,5],[9,7,2],
        [6,5,7],[9,2,4],[1,3,8],

        [7,6,1],[5,9,2],[8,4,3],
        [4,2,5],[3,7,8],[6,1,9],
        [9,3,8],[4,1,6],[5,2,7]
    ],
};

function isCompleted(board: SudokuBoard):boolean {
    let sliced: number[][] = [];
    let limitA : number = 0;
    let horizontalValidate:boolean = true;
    let limitB : number = 3;

    for (let i = 0; i < board.cells.length; i++) {
        sliced = board.cells.slice(limitA, limitB);
        let verify:boolean = verifyHorizontalLines(sliced);
        if (!verify) {
            horizontalValidate = false;
            break;
        }
        if (limitB === board.cells.length) {
            break;
        }
        limitA += 3;
        limitB += 3;
    }
    
    if(horizontalValidate === false){
        return false;
    }

    const firstBlock: number[][] = []
    const secondBlock: number[][] = []
    const thirdBlock: number[][] = []
    for (let i = 0; i < board.cells.length; i += 3) {
        firstBlock.push(board.cells[i])
        secondBlock.push(board.cells[i + 1])
        thirdBlock.push(board.cells[i + 2])
    }

   let firstBlockValidate = verifyVerticalLines(firstBlock)
   let secondBlockValidate = verifyVerticalLines(secondBlock)
   let thirdBlockValidate = verifyVerticalLines(thirdBlock)

   if(firstBlockValidate === false || secondBlockValidate === false || thirdBlockValidate === false){
    return false
   }
    return true;
}

function verifyVerticalLines(cells: number[][]):boolean{

    let firstCol: number[] = []
    let secondCol: number[] = []
    let thirdCol: number[] = []
    for(let i = 0; i < cells.length; i++){
        for(let j = 0; j < cells[i].length; j++){
            if(j === 0){
                firstCol.push(cells[i][j])
            }
            if(j === 1){
                secondCol.push(cells[i][j])
            }
            if(j === 2){
                thirdCol.push(cells[i][j])
            }
        }
    }

    let setFirstCol = new Set(firstCol)
    let setSecondCol = new Set(secondCol)
    let setThirdCol = new Set(thirdCol)
    
    if(setFirstCol.size < firstCol.length || setSecondCol.size < secondCol.length || setThirdCol.size < thirdCol.length){
        return false
    }
    return true
}

function verifyHorizontalLines(cells: number[][]):boolean {
    let numbersPerLine:number[] = [];
    let isCorrect:boolean = true;
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            numbersPerLine.push(cells[i][j]);
            if (cells[i][j] > 9) {
                isCorrect = false;
            }
        }
    }
    if (isCorrect === false) {
        return false;
    }
    const setNumbersPerLine = new Set(numbersPerLine);

    return setNumbersPerLine.size < numbersPerLine.length ? false : true;
}

isCompleted(board)