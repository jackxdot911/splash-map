type MarkerType = {
    id: number;
    latitude: number;
    longitude: number;
    price: string;
};

export const markersData : MarkerType[] = [
    { id: 1, latitude: 13.3392, longitude: 74.7400, price: '$100' }, // Udupi
    { id: 2, latitude: 12.9716, longitude: 77.5946, price: '$120' }, // Bengaluru
    { id: 3, latitude: 15.3173, longitude: 75.7139, price: '$150' }, // Belagavi
    { id: 4, latitude: 14.7956, longitude: 75.5712, price: '$90' },  // Hubballi
    { id: 5, latitude: 15.8497, longitude: 74.5061, price: '$110' }, // Mangaluru
    { id: 6, latitude: 13.0068, longitude: 77.5774, price: '$130' }, // Mysuru
    { id: 7, latitude: 12.9711, longitude: 77.6055, price: '$140' }, // Koramangala
    { id: 8, latitude: 16.8322, longitude: 75.5467, price: '$160' }, // Dharwad
    { id: 9, latitude: 15.6696, longitude: 74.9742, price: '$180' }, // Karwar
    { id: 10, latitude: 14.9834, longitude: 75.0454, price: '$170' }, // Hampi
    { id: 11, latitude: 11.1401, longitude: 74.7806, price: '$190' }, // Chikmagalur
    { id: 12, latitude: 12.5980, longitude: 76.6369, price: '$200' }, // Kodagu
    { id: 13, latitude: 14.1087, longitude: 75.4233, price: '$160' }, // Gadag
    { id: 14, latitude: 16.4905, longitude: 74.1637, price: '$140' }, // Shivamogga
    { id: 15, latitude: 13.8310, longitude: 75.2044, price: '$130' }, // Sirsi
    { id: 16, latitude: 12.9288, longitude: 75.8608, price: '$100' }, // Kasaragod
    { id: 17, latitude: 14.8782, longitude: 74.6185, price: '$120' }, // Kumta
    { id: 18, latitude: 12.2958, longitude: 76.6393, price: '$150' }, // Haveri
    { id: 19, latitude: 13.0082, longitude: 75.0424, price: '$110' }, // Ballari
    { id: 20, latitude: 14.6866, longitude: 75.8533, price: '$180' }, // Chitradurga
    { id: 21, latitude: 16.2065, longitude: 75.8964, price: '$160' }, // Bellary
    { id: 22, latitude: 15.0085, longitude: 76.4719, price: '$190' }, // Raichur
    { id: 23, latitude: 14.3711, longitude: 76.2339, price: '$130' }, // Koppal
    { id: 24, latitude: 13.0674, longitude: 77.5733, price: '$140' }, // Nanjangud
    { id: 25, latitude: 15.7005, longitude: 75.8824, price: '$200' }, // Sirsi
    { id: 26, latitude: 12.5637, longitude: 75.8077, price: '$150' }, // Madikeri
    { id: 27, latitude: 15.1005, longitude: 76.8620, price: '$130' }, // Hospet
    { id: 28, latitude: 14.3240, longitude: 75.5911, price: '$110' }, // Pavagada
    { id: 29, latitude: 15.3885, longitude: 76.0921, price: '$170' }, // Bagalkot
    { id: 30, latitude: 14.5340, longitude: 75.8830, price: '$160' }, // Mandya
    { id: 31, latitude: 15.5891, longitude: 74.3245, price: '$120' }, // Sankeshwara
    { id: 32, latitude: 14.7798, longitude: 76.6314, price: '$140' }, // Chikkanayakanahalli
    { id: 33, latitude: 12.9719, longitude: 77.7155, price: '$200' }, // Whitefield
    { id: 34, latitude: 15.1986, longitude: 75.6692, price: '$150' }, // Kotturu
    { id: 35, latitude: 15.8700, longitude: 75.0700, price: '$130' }, // Gadag
    { id: 36, latitude: 13.0280, longitude: 77.6340, price: '$140' }, // Tumakuru
    { id: 37, latitude: 12.9030, longitude: 75.8170, price: '$180' }, // Udupi
    { id: 38, latitude: 13.5397, longitude: 75.2268, price: '$190' }, // Sagara
    { id: 39, latitude: 15.3871, longitude: 74.0810, price: '$160' }, // Bhatkal
    { id: 40, latitude: 12.8400, longitude: 76.3550, price: '$120' }, // Tiptur
    { id: 41, latitude: 14.9926, longitude: 75.2340, price: '$150' }, // Yadgir
    { id: 42, latitude: 14.0285, longitude: 75.6487, price: '$130' }, // Srinivasapura
    { id: 43, latitude: 15.7597, longitude: 76.1200, price: '$140' }, // Humnabad
    { id: 44, latitude: 16.0826, longitude: 75.8700, price: '$200' }, // Latur
    { id: 45, latitude: 14.6142, longitude: 75.8423, price: '$180' }, // Ranebennur
    { id: 46, latitude: 12.9726, longitude: 77.5946, price: '$170' }, // Koramangala
    { id: 47, latitude: 15.9987, longitude: 76.6715, price: '$130' }, // Holalkere
    { id: 48, latitude: 14.9682, longitude: 74.3532, price: '$150' }, // Bhatkal
    { id: 49, latitude: 14.9125, longitude: 75.7783, price: '$160' }, // Soraba
    { id: 50, latitude: 12.6419, longitude: 75.9290, price: '$120' }, // Mangaluru
    { id: 51, latitude: 15.9063, longitude: 75.7675, price: '$140' }, // Yellapur
    { id: 52, latitude: 13.0890, longitude: 75.3094, price: '$100' }, // Sirsi
    { id: 53, latitude: 12.7620, longitude: 76.3710, price: '$110' }, // Srirangapatna
    { id: 54, latitude: 14.5751, longitude: 75.8893, price: '$200' }, // Koppal
    { id: 55, latitude: 15.2150, longitude: 76.8057, price: '$190' }, // Lingasugur
    { id: 56, latitude: 14.3113, longitude: 75.9435, price: '$160' }, // Pavagada
    { id: 57, latitude: 14.1830, longitude: 75.2153, price: '$140' }, // Channagiri
    { id: 58, latitude: 15.8114, longitude: 75.9268, price: '$120' }, // Dandeli
    { id: 59, latitude: 12.9628, longitude: 75.5978, price: '$130' }, // Vamanjoor
    { id: 60, latitude: 14.7775, longitude: 75.1172, price: '$150' }, // Haliyal
    { id: 61, latitude: 13.8297, longitude: 75.4285, price: '$140' }, // Siddapura
    { id: 62, latitude: 14.9736, longitude: 74.9377, price: '$160' }, // Mundgod
    { id: 63, latitude: 15.1648, longitude: 76.2652, price: '$130' }, // Bagalkot
    { id: 64, latitude: 12.5971, longitude: 75.8547, price: '$120' }, // Karkala
    { id: 65, latitude: 15.3501, longitude: 76.0073, price: '$150' }, // Kampli
    { id: 66, latitude: 14.5586, longitude: 75.9483, price: '$140' }, // Gadag
    { id: 67, latitude: 12.8313, longitude: 77.3292, price: '$190' }, // Mandya
    { id: 68, latitude: 12.3342, longitude: 76.8383, price: '$160' }, // Hunsur
    { id: 69, latitude: 14.0883, longitude: 75.4721, price: '$120' }, // Bhadravati
    { id: 70, latitude: 13.0497, longitude: 75.6713, price: '$180' }, // Mudigere
    { id: 71, latitude: 15.3024, longitude: 76.8391, price: '$140' }, // Bagepalli
    { id: 72, latitude: 12.9488, longitude: 76.8582, price: '$200' }, // Hunsur
    { id: 73, latitude: 14.9014, longitude: 75.5577, price: '$150' }, // Nargund
    { id: 74, latitude: 15.7035, longitude: 75.0675, price: '$130' }, // Puttur
    { id: 75, latitude: 12.9862, longitude: 75.5870, price: '$160' }, // Udupi
    { id: 76, latitude: 15.6485, longitude: 76.3420, price: '$140' }, // Gokak
    { id: 77, latitude: 13.3000, longitude: 75.7500, price: '$120' }, // Kumta
    { id: 78, latitude: 14.6334, longitude: 75.6578, price: '$130' }, // Ranebennur
    { id: 79, latitude: 12.9683, longitude: 77.5890, price: '$110' }, // Channapatna
    { id: 80, latitude: 14.6404, longitude: 75.7045, price: '$180' }, // Shiggaon
    { id: 81, latitude: 15.5828, longitude: 74.8063, price: '$150' }, // Karkala
    { id: 82, latitude: 12.8460, longitude: 76.7232, price: '$190' }, // Periyapatna
    { id: 83, latitude: 13.7901, longitude: 75.9706, price: '$140' }, // Soraba
    { id: 84, latitude: 14.4562, longitude: 75.8158, price: '$160' }, // Doddaballapura
    { id: 85, latitude: 15.2262, longitude: 76.8245, price: '$130' }, // Mankapur
    { id: 86, latitude: 14.6340, longitude: 75.1534, price: '$110' }, // Byadgi
    { id: 87, latitude: 15.9401, longitude: 75.4012, price: '$180' }, // Tirthahalli
    { id: 88, latitude: 12.7970, longitude: 75.1991, price: '$140' }, // Ajjampur
    { id: 89, latitude: 14.5038, longitude: 75.4511, price: '$120' }, // Malavalli
    { id: 90, latitude: 15.8280, longitude: 75.3600, price: '$130' }, // Shiggaon
    { id: 91, latitude: 14.8965, longitude: 76.1223, price: '$150' }, // Chikkanayakanahalli
    { id: 92, latitude: 13.8491, longitude: 75.2636, price: '$160' }, // Hangal
    { id: 93, latitude: 12.8290, longitude: 75.8825, price: '$190' }, // Kundapura
    { id: 94, latitude: 12.5845, longitude: 75.8230, price: '$140' }, // Karkala
    { id: 95, latitude: 14.0521, longitude: 75.8471, price: '$130' }, // Harapanahalli
    { id: 96, latitude: 15.1600, longitude: 76.0120, price: '$120' }, // Chitradurga
    { id: 97, latitude: 13.0089, longitude: 75.2638, price: '$200' }, // Bhadravati
    { id: 98, latitude: 14.9178, longitude: 75.5144, price: '$150' }, // Bagalkot
    { id: 99, latitude: 15.7891, longitude: 75.3399, price: '$110' }, // Kolar
    { id: 100, latitude: 12.7309, longitude: 76.5224, price: '$130' }, // Channarayapatna
    { id: 101, latitude: 13.9392, longitude: 74.7400, price: '$100' }, // Udupi
    { id: 102, latitude: 13.3400, longitude: 74.7500, price: '$120' },
    { id: 103, latitude: 13.3300, longitude: 74.7300, price: '$150' },
    { id: 104, latitude: 13.3500, longitude: 74.7400, price: '$80' },
    { id: 105, latitude: 13.3600, longitude: 74.7200, price: '$200' },
    { id: 106, latitude: 13.3700, longitude: 74.7300, price: '$90' },
    { id: 107, latitude: 13.3800, longitude: 74.7400, price: '$110' },
    { id: 109, latitude: 13.3100, longitude: 74.7800, price: '$160' },
    { id: 110, latitude: 13.3200, longitude: 74.7600, price: '$140' },
    { id: 111, latitude: 13.3000, longitude: 74.7500, price: '$75' },
    { id: 112, latitude: 13.3350, longitude: 74.7650, price: '$95' },
    { id: 113, latitude: 13.3450, longitude: 74.7800, price: '$85' },
    { id: 115, latitude: 13.3650, longitude: 74.8050, price: '$160' },
    { id: 116, latitude: 13.3750, longitude: 74.7400, price: '$110' },
    { id: 117, latitude: 13.3850, longitude: 74.7300, price: '$170' },
    { id: 118, latitude: 13.3950, longitude: 74.7200, price: '$90' },
    { id: 119, latitude: 13.3050, longitude: 74.7350, price: '$105' },
    { id: 120, latitude: 13.3150, longitude: 74.7400, price: '$140' },
    { id: 121, latitude: 13.3250, longitude: 74.7450, price: '$80' },
    { id: 122, latitude: 13.3350, longitude: 74.7500, price: '$115' },
    { id: 123, latitude: 13.3450, longitude: 74.7550, price: '$75' },
    { id: 124, latitude: 13.3550, longitude: 74.7600, price: '$95' },
    { id: 129, latitude: 13.4050, longitude: 74.7850, price: '$150' },
    { id: 130, latitude: 13.4150, longitude: 74.7900, price: '$120' },
    { id: 131, latitude: 13.3350, longitude: 74.7300, price: '$100' },
    { id: 132, latitude: 13.3000, longitude: 74.7400, price: '$200' },
    { id: 133, latitude: 13.3200, longitude: 74.7200, price: '$90' },
    { id: 134, latitude: 13.3500, longitude: 74.8000, price: '$75' },
    { id: 135, latitude: 13.3700, longitude: 74.7850, price: '$140' },
    { id: 136, latitude: 13.4400, longitude: 74.7250, price: '$200' },
];

