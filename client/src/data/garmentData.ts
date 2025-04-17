import { Garment } from '../types/gameTypes';

// Define garment data with accurate defect coordinates
const garmentData: Garment[] = [
  {
    id: '1',
    name: 'Perfect T-Shirt',
    imageUrl: '/images/garments/t-shirt-perfect.jpg',
    defects: [],
    isOriginal: true
  },
  {
    id: '2',
    name: 'Defective T-Shirt',
    imageUrl: '/images/garments/t-shirt-defective.jpg',
    defects: [
      {
        x: 300,
        y: 200,
        radius: 20,
        description: 'Hole in fabric'
      }
    ],
    isOriginal: false
  },
  {
    id: '3',
    name: 'Perfect Jeans',
    imageUrl: '/images/garments/jeans-perfect.jpg',
    defects: [],
    isOriginal: true
  },
  {
    id: '4',
    name: 'Defective Jeans',
    imageUrl: '/images/garments/jeans-defective.jpg',
    defects: [
      {
        x: 250,
        y: 300,
        radius: 25,
        description: 'Tear in fabric'
      }
    ],
    isOriginal: false
  },
  {
    id: '5',
    name: 'Garment with Multiple Defects',
    imageUrl: '/images/garments/images.jpeg',
    defects: [
      {
        x: 200,
        y: 150,
        radius: 20,
        description: 'Color discoloration'
      },
      {
        x: 350,
        y: 250,
        radius: 25,
        description: 'Fabric damage'
      }
    ],
    isOriginal: false
  },
  {
    id: '6',
    name: 'Another Defective Garment',
    imageUrl: '/images/garments/images (1).jpeg',
    defects: [
      {
        x: 300,
        y: 200,
        radius: 30,
        description: 'Stitching error'
      }
    ],
    isOriginal: false
  },
  {
    id: '7',
    name: 'Garment with Subtle Defect',
    imageUrl: '/images/garments/images (2).jpeg',
    defects: [
      {
        x: 400,
        y: 300,
        radius: 15,
        description: 'Small tear'
      }
    ],
    isOriginal: false
  },
  {
    id: '8',
    name: 'Perfect Garment Sample',
    imageUrl: '/images/garments/default-garment.jpg',
    defects: [],
    isOriginal: true
  },
  {
    id: '9',
    name: 'Garment with Edge Defect',
    imageUrl: '/images/garments/images (3).jpeg',
    defects: [
      {
        x: 150,
        y: 100,
        radius: 20,
        description: 'Edge fraying'
      }
    ],
    isOriginal: false
  },
  {
    id: '10',
    name: 'Final Test Garment',
    imageUrl: '/images/garments/images.jpeg',
    defects: [
      {
        x: 250,
        y: 200,
        radius: 25,
        description: 'Material flaw'
      }
    ],
    isOriginal: false
  }
];

export default garmentData;