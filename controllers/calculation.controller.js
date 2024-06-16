

const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");
const math = require('mathjs');

const turf = require('@turf/turf');
// const turf = require('turf');
// var gwrCalc = require('../hook/gwrCalc.js')



module.exports.getCalcProvinsi = async function (req, res) {
  try {
    const dataType = req.params.dataType;
    const year = req.params.year;

    // const dataProvinsi = await db.Provinsi.findAll(
    //   {
    //     attributes: ['id','nama_provinsi','latitude','longitude'],
    //     order: [['id', 'ASC']],
    //   }
    // );
    const dataCalc = await db.IPM_Provinsi.findAll(
      {
        attributes: ['id',[dataType, 'value'],'provinsi_Id'],
        where: {tahun: year},
        order: [['provinsi_Id', 'ASC']],
      }
    );

    let n;
    if(dataType === 'ipm' || dataType === 'gwr'){n = 0.8;}
    else if(dataType === 'uhh'){n=0.8}
    else if(dataType === 'ahls' || dataType === 'ppd'){n=0.6}
    else if(dataType === 'arls' || dataType === 'iuhh'){n=0.4}
    else {n=0.5}

    let arrTotal = [];
    dataCalc.forEach(item => {
      arrTotal.push(parseFloat(item.dataValues.value));
    });

    let totalData = 0;
    for (i=0; i < arrTotal.length; i++){
      totalData += arrTotal[i];
    }

    const totalProvinsi = dataCalc.length;
    const average = totalData / totalProvinsi;

    const stdev = math.std(arrTotal); 
    const min = average - (n * stdev);
    const max = average + (n * stdev);

    const dataCalculate = {
      dataValue: dataType,
      sumData: totalData,
      totalProvinsi,
      average,
      stdev,
      min,
      max,
      // dataRegion: dataProvinsi
    }
    return res.status(200).json({
      success: true,
      message: 'success',
      data: dataCalculate
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getCalcKabKot = async function (req, res) {
  try {
    const dataType = req.params.dataType;
    const year = req.params.year;

    const dataCalc = await db.IPM_Kabupaten_Kota.findAll(
      {
        attributes: ['id',[dataType, 'value'],'kabupaten_kota_Id'],
        where: {tahun: year},
        order: [['kabupaten_kota_Id', 'ASC']],
      }
    );

    let n;
    if(dataType === 'ipm' || dataType === 'gwr'){n = 0.8;}
    else if(dataType === 'uhh'){n=0.8}
    else if(dataType === 'ahls' || dataType === 'ppd'){n=0.6}
    else if(dataType === 'arls' || dataType === 'iuhh'){n=0.4}
    else {n=0.5}

    let arrTotal = [];
    dataCalc.forEach(item => {
      arrTotal.push(parseFloat(item.dataValues.value));
    });

    let totalData = 0;
    for (i=0; i < arrTotal.length; i++){
      totalData += arrTotal[i];
    }

    const totalKabKot = dataCalc.length;
    const average = totalData / totalKabKot;

    const stdev = math.std(arrTotal); 
    const min = average - (n * stdev);
    const max = average + (n * stdev);

    const dataCalculate = {
      dataValue: dataType,
      sumData: totalData,
      totalKabKot,
      average,
      stdev,
      min,
      max,
      // dataRegion: dataKabKot
    }
    return res.status(200).json({
      success: true,
      message: 'success',
      data: dataCalculate
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getAllTotal = async function (req, res) {
  try {
    const totalProv = await db.Provinsi.findAll();
    const totalKabKot = await db.Kabupaten_Kota.findAll();
    const totalDataProv = await db.IPM_Provinsi.findAll();
    const totalDataKabKot = await db.IPM_Kabupaten_Kota.findAll();

    let totalData = totalDataKabKot.length + totalDataProv.length;

    return res.status(200).json({
      sucess: true,
      total: totalData,
      prov: totalProv.length,
      kabkot: totalKabKot.length,
      dataProv: totalDataProv.length,
      dataKabkot: totalDataKabKot.length,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getGWRProvinsi = async function (req, res) {
  try {
    const year = req.params.year;
    let dataGWR;

    dataGWR = await db.IPM_Provinsi.findAll({
      attributes: ['id', 'tahun', 'ipm', ['gwr', 'value'], 'provinsi_Id'],
      where: {tahun: year},
      include: [
        {
          model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi','latitude','longitude']
        }
      ],
      group: ['Provinsi.id', 'IPM_Provinsi.provinsi_Id','IPM_Provinsi.id'],
      order: [['provinsi_Id', 'ASC'],['tahun', 'ASC']]
    })

    return res.status(200).json({
      sucess: true,
      data: dataGWR,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getGWRKabKot = async function (req, res) {
  try {
    const year = req.params.year;
    let dataGWR;

    dataGWR = await db.IPM_Kabupaten_Kota.findAll({
      attributes: ['id', 'tahun', 'ipm', ['gwr', 'value'], 'kabupaten_kota_Id'],
      where: {tahun: year},
      include: [
        {
          model: db.Kabupaten_Kota, as: 'Kabupaten_Kotum', attributes: ['id','nama_kabupaten_kota','latitude','longitude']
        }
      ],
      group: ['Kabupaten_Kotum.id', 'IPM_Kabupaten_Kota.kabupaten_kota_Id','IPM_Kabupaten_Kota.id'],
      order: [['kabupaten_kota_Id', 'ASC'],['tahun', 'ASC']]
    })

    return res.status(200).json({
      sucess: true,
      data: dataGWR,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}


// module.exports.getGWR = async function (req, res) {
//   try {
//     const dataCalc = await db.IPM_Provinsi.findAll(
//       {
//         attributes: ['id','ipm', 'iuhh', 'ipthn', 'iplrn','provinsi_Id'],
//         where: {tahun: 2022},
//         include: [
//           {
//             model: db.Provinsi, as: 'Provinsi', attributes: ['id','nama_provinsi', 'latitude','longitude']
//           }
//         ],
//         order: [['provinsi_Id', 'ASC']],
//       }
//     );

//     const dataset = await dataCalc.map((data, index)=> {
//       return {
//         id: data.id,
//         coordinates:[data.Provinsi.latitude, data.Provinsi.longitude],
//         dependent: data.ipm, 
//         independent: [data.iuhh, data.ipthn, data.iplrn]
//       }     
//     })

//     const bandwidths = [1000, 2000, 3000]; // Adjust as needed
//     let optimalBandwidth ;
//     let minAIC = Infinity;

//     // Step 2
//     bandwidths.forEach((bandwidth) => {
//       let sumAIC = 0;

//       dataset.forEach((dataPoint, index) => {
//         const { coordinates, dependent, independent } = dataPoint;

//         // Calculate GWR using the current bandwidth
//         let sumX = Array(independent.length).fill(0);
//         let sumY = 0;
//         let sumW = 0;
//         let sumYResidualsSquared = 0;
//         let sumYPredictedSquared = 0;

//         dataset.forEach((neighbor, neighborIndex) => {
//           if (neighborIndex !== index) {
//             const neighborCoordinates = neighbor.coordinates;
//             const neighborDependent = neighbor.dependent;
//             const neighborIndependent = neighbor.independent;

//             // Calculate the Euclidean distance between the current point and the neighbor
//             const distance = turf.distance(turf.point(coordinates), turf.point(neighborCoordinates));

//             // Calculate the weight using bisquare weighting
//             const weight = distance > bandwidth ? 0 : (1 - (distance / bandwidth) ** 2) ** 2;

//             // Update the weighted sums
//             for (let i = 0; i < independent.length; i++) {
//               sumX[i] += weight * neighborIndependent[i];
//             }
//             sumY += weight * neighborDependent;
//             sumW += weight;

//             // Calculate the predicted and residual values
//             let temp1 = turf.point(coordinates)
//             let temp2 = turf.point(neighborCoordinates)
//             const prediction = turf.distance(temp1, temp2)
//               > bandwidth ? 0 : turf.distance(temp2, temp2);
//             const residual = neighborDependent - prediction;

//             // Update the sum of squared residuals and predicted values
//             sumYResidualsSquared += weight * residual ** 2;
//             sumYPredictedSquared += weight * prediction ** 2;
//           }
//         });

//         // Calculate AIC for the current data point and bandwidth
//         const n = dataset.length;
//         const k = independent.length;
//         const dof = n - k - 1;
//         const sse = sumYResidualsSquared;
//         const aic = n * Math.log(sse / n) + 2 * (k + 1);

//         sumAIC += aic;
//       });

//       // Update the optimal bandwidth if the current AIC is lower
//       if (sumAIC < minAIC) {
//         minAIC = sumAIC;
//         optimalBandwidth = bandwidth;
//       }
//     });

//     // Step 3
//     const gwrResults = [];
//     dataset.forEach((dataPoint) => {
//       const { coordinates, dependent, independent } = dataPoint;

//       let sumX = Array(independent.length).fill(0);
//       let sumY = 0;
//       let sumW = 0;
//       let sumYResidualsSquared = 0;
//       let sumYPredictedSquared = 0;

//       dataset.forEach((neighbor) => {
//         const neighborCoordinates = neighbor.coordinates;
//         const neighborDependent = neighbor.dependent;
//         const neighborIndependent = neighbor.independent;

//         // Calculate the Euclidean distance between the current point and the neighbor
//         const distance = turf.distance(turf.point(coordinates), turf.point(neighborCoordinates));

//         // Calculate the weight using bisquare weighting
//         const weight = distance > optimalBandwidth ? 0 : (1 - (distance / optimalBandwidth) ** 2) ** 2;

//         // Update the weighted sums
//         for (let i = 0; i < independent.length; i++) {
//           sumX[i] += weight * neighborIndependent[i];
//         }
//         sumY += weight * neighborDependent;
//         sumW += weight;

//         // Calculate the predicted and residual values
//         let temp1 = turf.point(coordinates)
//         let temp2 = turf.point(neighborCoordinates)
//         const prediction = turf.distance(temp1, temp2)
//           > optimalBandwidth ? 0 : turf.distance(temp1, temp2);
//         const residual = neighborDependent - prediction;

//         // Update the sum of squared residuals and predicted values
//         sumYResidualsSquared += weight * residual ** 2;
//         sumYPredictedSquared += weight * prediction ** 2;
//       });

//       const coefficients = sumW !== 0 ? sumX.map((sum) => sum / sumW) : Array(independent.length).fill(0);
//       const prediction = coefficients.reduce((acc, curr, index) => acc + curr * independent[index], 0);
//       const residual = dependent - prediction;

//       // Step 4: Testing - Calculate p-value, coefficient determination, and AIC
//       const n = dataset.length;
//       const k = independent.length;
//       const dof = n - k - 1;
//       const sse = sumYResidualsSquared;
//       const sst = sumYPredictedSquared;
//       const mse = sse / dof;
//       const f = (sst - sse) / (k * mse);
//       const pValue = 1 - jointCDF(f, k, dof);
//       const rSquared = 1 - sse / sst;
//       const aic = n * Math.log(sse / n) + 2 * (k + 1);

//       // Store the GWR results for the current data point
//       gwrResults.push({
//         coordinates,
//         coefficients,
//         prediction,
//         residual,
//         pValue,
//         rSquared,
//         aic,
//       });
//     });

//     // bandwidths.forEach((bandwidth) => {
//     //   let sumAIC = 0;
    
//     //   dataset.forEach((dataPoint, index) => {
//     //     const { coordinates, dependent, independent } = dataPoint;
//     //     const [lat, lon] = coordinates;
    
//     //     // Calculate GWR using the current bandwidth
//     //     let sumX = Array(independent.length).fill(0);
//     //     let sumY = 0;
//     //     let sumXY = 0;
//     //     let sumXX = 0;
//     //     let sumW = 0;
//     //     let sumYResidualsSquared = 0;
    
//     //     dataset.forEach((neighbor, neighborIndex) => {
//     //       if (neighborIndex !== index) {
//     //         const { coordinates: neighborCoordinates, dependent: neighborDependent, independent: neighborIndependent } = neighbor;
//     //         const [neighborLat, neighborLon] = neighborCoordinates;
    
//     //         // Calculate the Euclidean distance between the current point and the neighbor
//     //         const distance = Math.sqrt((lat - neighborLat) ** 2 + (lon - neighborLon) ** 2);
    
//     //         // Calculate the weight using fixed kernel with bisquare weighting
//     //         const weight = distance > bandwidth ? 0 : (1 - (distance / bandwidth) ** 2) ** 2;
    
//     //         // Update the weighted sums
//     //         for (let i = 0; i < independent.length; i++) {
//     //           sumX[i] += weight * neighborIndependent[i];
//     //         }
//     //         sumY += weight * neighborDependent;
//     //         sumXY += weight * neighborDependent * independent;
//     //         sumXX += weight * independent * independent;
//     //         sumW += weight;
    
//     //         // Calculate the predicted and residual values
//     //         const coefficients = [];
//     //         for (let i = 0; i < independent.length; i++) {
//     //           const num = sumW * sumXY - sumX[i] * sumY;
//     //           coefficients[i] = num / (sumW * sumXX - sumX.reduce((acc, val) => acc + val, 0) ** 2);
//     //         }
    
//     //         const prediction = independent.reduce((acc, val, i) => acc + val * coefficients[i], 0);
//     //         const residual = neighborDependent - prediction;
    
//     //         // Update the sum of squared residuals
//     //         sumYResidualsSquared += weight * residual ** 2;
//     //       }
//     //     });
    
//     //     // Calculate AIC for the current data point and bandwidth
//     //     const n = dataset.length;
//     //     const k = independent.length + 1;
//     //     const dof = n - k - 1;
//     //     const aic = n * Math.log(sumYResidualsSquared / n) + 2 * (k + 1);
    
//     //     sumAIC += aic;
//     //   });
    
//     //   // Update the optimal bandwidth if the current AIC is lower
//     //   if (sumAIC < minAIC) {
//     //     minAIC = sumAIC;
//     //     optimalBandwidth = bandwidth;
//     //   }
//     // });
    
//     // Step 3: Perform parameter estimation using fixed kernel with bisquare weighting
//     // const gwrResults = [];
    
//     // dataset.forEach((dataPoint, index) => {
//     //   const { coordinates, dependent, independent } = dataPoint;
//     //   const [lat, lon] = coordinates;
    
//     //   let sumX = Array(independent.length).fill(0);
//     //   let sumY = 0;
//     //   let sumXY = 0;
//     //   let sumXX = 0;
//     //   let sumW = 0;
//     //   let sumYResidualsSquared = 0;
    
//     //   dataset.forEach((neighbor, neighborIndex) => {
//     //     if (neighborIndex !== index) {
//     //       const { coordinates: neighborCoordinates, dependent: neighborDependent, independent: neighborIndependent } = neighbor;
//     //       const [neighborLat, neighborLon] = neighborCoordinates;
    
//     //       const distance = Math.sqrt((lat - neighborLat) ** 2 + (lon - neighborLon) ** 2);
//     //       const weight = distance > optimalBandwidth ? 0 : (1 - (distance / optimalBandwidth) ** 2) ** 2;
    
//     //       for (let i = 0; i < independent.length; i++) {
//     //         sumX[i] += weight * neighborIndependent[i];
//     //       }
//     //       sumY += weight * neighborDependent;
//     //       sumXY += weight * neighborDependent * independent;
//     //       sumXX += weight * independent * independent;
//     //       sumW += weight;
    
//     //       const coefficients = [];
//     //       for (let i = 0; i < independent.length; i++) {
//     //         const num = sumW * sumXY - sumX[i] * sumY;
//     //         coefficients[i] = num / (sumW * sumXX - sumX.reduce((acc, val) => acc + val, 0) ** 2);
//     //       }
    
//     //       const prediction = independent.reduce((acc, val, i) => acc + val * coefficients[i], 0);
//     //       const residual = neighborDependent - prediction;
    
//     //       sumYResidualsSquared += weight * residual ** 2;
//     //     }
//     //   });
    
//     //   const coefficients = [];
//     //   for (let i = 0; i < independent.length; i++) {
//     //     const num = sumW * sumXY - sumX[i] * sumY;
//     //     coefficients[i] = num / (sumW * sumXX - sumX.reduce((acc, val) => acc + val, 0) ** 2);
//     //   }
    
//     //   const prediction = independent.reduce((acc, val, i) => acc + val * coefficients[i], 0);
//     //   const residual = dependent - prediction;
    
//     //   gwrResults.push({
//     //     coordinates,
//     //     dependent,
//     //     independent,
//     //     coefficients,
//     //     prediction,
//     //     residual,
//     //   });
//     // });

//     // dataset.forEach((dataPoint) => {
//     //   const { coordinates, dependent, independent } = dataPoint;
//     //   const gwrPoint = turf.point(coordinates, {
//     //     dependent,
//     //     independent,
//     //   });
      
//     //   const neighbors = turf.pointsWithinRadius(gwrPoint, dataset, crossValidationBandwidth, { units: 'kilometers' });
//     //   const kernel = (distance) => {
//     //     // Implement your kernel function here (e.g., bisquare, gaussian)
//     //     // Return the weight based on the distance
//     //   };
      
//     //   const weights = neighbors.features.map((neighbor) => {
//     //     const distance = turf.distance(gwrPoint, neighbor, { units: 'kilometers' });
//     //     return {
//     //       distance,
//     //       weight: kernel(distance),
//     //     };
//     //   });
      
//     //   const weightSum = weights.reduce((sum, weight) => sum + weight.weight, 0);
      
//     //   const coefficient = weights.reduce((sum, weight, index) => {
//     //     const neighborDependent = neighbors.features[index].properties.dependent;
//     //     return sum + weight.weight * neighborDependent;
//     //   }, 0) / weightSum;
      
//     //   const residuals = weights.map((weight, index) => {
//     //     const neighborDependent = neighbors.features[index].properties.dependent;
//     //     const neighborCoefficient = neighborDependent - coefficient;
//     //     return neighborCoefficient * weight.weight;
//     //   });
      
//     //   const residualSum = residuals.reduce((sum, residual) => sum + residual, 0);
      
//     //   const gwrResult = {
//     //     coordinates,
//     //     coefficient,
//     //     residuals,
//     //     residualSum,
//     //   };
      
//     //   gwrResults.push(gwrResult);
//     // });
    
//     // Step 4: Testing - Calculate coefficient determination (R-squared), AIC, and p-value
    
//     // dataset.forEach((dataPoint) => {
//     //   const { coordinates, dependent, independent } = dataPoint;
//     //   const [lat, lon] = coordinates;
    
//     //   // Find neighboring points within the bandwidth
//     //   const neighbors = dataset.filter((neighbor) => {
//     //     const [neighborLat, neighborLon] = neighbor.coordinates;
//     //     const distance = Math.sqrt((lat - neighborLat) ** 2 + (lon - neighborLon) ** 2);
//     //     return distance <= crossValidationBandwidth;
//     //   });
    
//     //   // Perform GWR parameter estimation
//     //   const weights = neighbors.map((neighbor) => {
//     //     const [neighborLat, neighborLon] = neighbor.coordinates;
//     //     const distance = Math.sqrt((lat - neighborLat) ** 2 + (lon - neighborLon) ** 2);
//     //     const weight = distance <= crossValidationBandwidth ? Math.pow(1 - Math.pow(distance / crossValidationBandwidth, 2), 2) : 0;
//     //     return { neighbor, weight };
//     //   });
    
//     //   const weightSum = weights.reduce((sum, { weight }) => sum + weight, 0);
//     //   const weightedSumDependent = weights.reduce((sum, { neighbor, weight }) => sum + neighbor.dependent * weight, 0);
//     //   const weightedSumIndependent = [];
//     //   independent.forEach((_, index) => {
//     //     const weightedSum = weights.reduce((sum, { neighbor, weight }) => sum + neighbor.independent[index] * weight, 0);
//     //     weightedSumIndependent.push(weightedSum);
//     //   });
    
//     //   const coefficient = weightedSumDependent / weightSum;
//     //   const coefficientsIndependent = weightedSumIndependent.map((sum) => sum / weightSum);
    
//     //   // Calculate residuals
//     //   const residuals = neighbors.map((neighbor) => {
//     //     const predicted = coefficientsIndependent.reduce((sum, coefficient, index) => sum + coefficient * neighbor.independent[index], 0);
//     //     return neighbor.dependent - predicted;
//     //   });
    
//     //   // Store GWR results
//     //   gwrResults.push({
//     //     coordinates,
//     //     coefficient,
//     //     coefficientsIndependent,
//     //     residuals,
//     //   });
//     // });
    
    
//     // const n = dataset.length;
//     // const k = 3; // Number of independent variables
//     // const dof = n - k - 1;
//     // const sst = dataset.reduce((acc, dataPoint) => acc + (dataPoint.dependent - (y / n)) ** 2, 0);
//     // const sse = dataset.reduce((acc, dataPoint) => acc + dataPoint.residual ** 2, 0);
//     // const rSquared = 1 - sse / sst;
//     // const mse = sse / dof;
//     // const aic = n * Math.log(sse / n) + 2 * (k + 1);
//     // const f = (sst - sse) / (k * mse);
//     // const pValue = 1 - jointCDF(f, k, dof);

//     return res.status(200).json({
//       sucess: true,
//       data: dataset[0],
//       bandwidth: optimalBandwidth,
//       total: gwrResults.length,
//       r: rSquared,
//       aic: aic,
//       pValue: pValue,
//       result: gwrResults
      
     
//     });
//   } catch (error) {
//     return res.status(400).json({
//       sucess: false,
//       error: error,
//       message: error.message
//     })
//   }
// }

// function calculateGWRParameters(sumW, sumX, sumY, sumXY, sumXX) {
//   const det = sumW * sumXX - sumX.reduce((acc, val) => acc + val, 0) ** 2;
//   const coefficients = [];
//   for (let i = 0; i < sumX.length; i++) {
//     const num = sumW * sumXY - sumX[i] * sumY;
//     coefficients[i] = num / det;
//   }
//   return coefficients;
// }

// // Function to calculate prediction using GWR coefficients
// function calculatePrediction(x, coefficients) {
//   let prediction = 0;
//   for (let i = 0; i < coefficients.length; i++) {
//     prediction += x[i] * coefficients[i];
//   }
//   return prediction;
// }

// function jointCDF(f, k, dof) {
//   let sum = 0;
//   const step = 0.0001; // Adjust the step size as needed

//   for (let x = 0; x <= f; x += step) {
//     const pdf = Math.exp(-0.5 * (dof + k + 1) * Math.log(1 + (x / dof))) / (Math.sqrt(x) * Math.pow(2, 0.5 * k) * Math.exp(Math.log(Math.gamma((0.5 * (dof + k + 1))))));
//     sum += pdf * step;
//   }

//   return sum;
// }