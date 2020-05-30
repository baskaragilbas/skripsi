const sum = (total, current) => total + current
const sumSquare = (total, current) => total + Math.pow(current,2)
const prod = (total, current) => total * current
const transpose = array => array[0].map((x,i) => array.map(x => x[i]))


function normalizedDecisionMatrix(matrix) {
    
    let sum_square = matrix.map( row => row.reduce(sumSquare,0))
    let normalized = matrix.map( (row,index) => row.map( x => x/Math.sqrt(sum_square[index])))
    return normalized
}

function weightedDecisionMatrix(matrix,weight) {
    let weighted = matrix.map((row, index )=> row.map(x => x*weight[index]))

    return weighted
}

function generateIdealSolution(matrix,type){
    let PIS = matrix.map((row,index) => type[index]? Math.max(...row) : Math.min(...row))
    let NIS = matrix.map((row,index) => type[index]? Math.min(...row) : Math.max(...row))
    return([PIS,NIS])
}

function squaredDistance(matrix,goal){
    let distance = matrix.map((row,index)=> {
       return row.map( x => Math.pow(x-goal[index],2))
    })
    return distance
}

function euclidianDistanceWithIdealSolution(matrix,ideal){
    let squaredDistancePIS = squaredDistance(matrix,ideal[0])
    let squaredDistanceNIS = squaredDistance(matrix,ideal[1])
    let distancePIS = transpose(squaredDistancePIS).map(row => Math.sqrt(row.reduce(sum)))
    let distanceNIS = transpose(squaredDistanceNIS).map(row => Math.sqrt(row.reduce(sum)))
    
    return [distancePIS,distanceNIS]
}

function CCI(matrix){
    console.log(matrix)
    let cci = matrix.map( row => row[1]/(row[0]+row[1]))

    return cci
}

function TOPSIS(matrix, weight, type){
    //normalizing decision matrix
    let normalized = normalizedDecisionMatrix(matrix)

    //generating normalized weighted decision matrix
    let weighted = weightedDecisionMatrix(normalized, weight)

    //generating PIS and NIS
    let ideal = generateIdealSolution(weighted, type)

    //finding the distance between alternative and ideal solution
    let distance = euclidianDistanceWithIdealSolution(weighted, ideal)

    //distance need to be transposed before the CCI calculated
    let cci = CCI(transpose(distance))

    return cci
}
