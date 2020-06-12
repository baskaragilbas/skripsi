const sum = (total, current) => total + current
const prod = (total, current) => total * current
const transpose = array => array[0].map((x,i) => array.map(x => x[i]))


function generateMatrix(weight,modifier) {
    let matrix =[
        [1,null,null,null],
        [null,1,null,null],
        [null,null,1,null],
        [null,null,null,1]
    ];
    for (let i=0; i<weight.length; i++) {
        if(i<3){
            matrix[0][i+1] = Math.pow(weight[i],modifier[i])
            matrix[i+1][0] = 1/matrix[0][i+1]
        }else if (i<5) {
            matrix[1][i-1] = Math.pow(weight[i],modifier[i])
            matrix[i-1][1] = 1/matrix[1][i-1]
        } else {
            matrix[2][3] = Math.pow(weight[i],modifier[i])
            matrix[3][2] = 1/Math.pow(weight[i],modifier[i])
        }
      }

    return matrix
}

function rowMatrix(matrix) {
    let row_matrix = []
    
    for (let i=0; i<matrix.length; i++) {
        row_matrix.push(
            matrix[i].reduce(sum)
        )
      }

    return row_matrix
}

function colMatrix(matrix) {
    let col_matrix =[]
    let tMatrix = transpose(matrix)
    for (let i=0; i<tMatrix.length; i++) {
        col_matrix.push(
            tMatrix[i].reduce(sum)
        )
      }

    return col_matrix
}

function normalize(matrix){

    let tMatrix =transpose(matrix)
    let col_matrix = colMatrix(matrix)
    let normalize_matrix = []
    for (let i=0; i<tMatrix.length; i++) {
        normalize_matrix.push(tMatrix[i].map(function(x){return x/col_matrix[i]}))
      }
      
    return transpose(normalize_matrix)
}

function eigenVector(matrix){
    let geo_mean = []
    
    for (let i=0; i<matrix.length; i++) {
        let mean = Math.pow(matrix[i].reduce(prod),1/4)
        geo_mean[i] = mean
      }

    let sumGeoMean = geo_mean.reduce(sum)
    
    let result = geo_mean.map(function(x){return x/sumGeoMean})
    return result
}

function eigenValue(matrix){
    let eigen_vector = eigenVector(matrix)
    let eigen_value = []
    for (let i=0; i<matrix.length; i++) {
        eigen_value.push(matrix[i].map(function(x, index ){ return x*eigen_vector[index]}).reduce(sum))
      }
    let result = (eigen_value.map(function(x,key){return x/ eigen_vector[key]}).reduce(sum))/eigen_value.length
    return result
}

function consistency (matrix){
    let eigen_value = eigenValue(matrix)

    let CR = ((eigen_value-4)/(4))/(0.90)

    return CR
}

function AHP (matrix) {
    
    //Finding the weight
    let normalize_matrix = normalize(matrix)

    let row_matrix = rowMatrix(normalize_matrix)
    let weight = row_matrix.map(function(x){return x/4})
    
    //Finding the Consistency Ratio
    let CR = consistency(matrix)
    let ahp = {
        ['weight'] : weight,
        ['consistency'] : CR
    }

    return ahp
}

module.exports = {
    generateMatrix : generateMatrix,
    rowMatrix : rowMatrix,
    colMatrix : colMatrix,
    normalize : normalize,
    eigenValue : eigenValue,
    eigenVector : eigenVector,
    AHP : AHP
} 