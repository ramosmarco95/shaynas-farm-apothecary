import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/productModel.js'

dotenv.config()

const products = [
  {
    name: 'Lavender Calm Salve',
    slug: 'lavender-calm-salve',
    category: 'Salves',
    price: 14.99,
    shortDescription: 'A soothing herbal salve blended with lavender and beeswax.',
    description: 'Hand-crafted in small batches using organic lavender essential oil, raw beeswax, and cold-pressed olive oil. This salve softens dry skin and promotes calm. Perfect for hands, elbows, and restless nights.',
    ingredients: 'Beeswax, Olive Oil, Lavender Essential Oil, Calendula Extract',
    size: '2 oz tin',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1612540139150-4b1b5a4b5b5a?w=600',
    isFeatured: true,
  },
  {
    name: 'Forest Floor Soap Bar',
    slug: 'forest-floor-soap-bar',
    category: 'Soaps',
    price: 9.99,
    shortDescription: 'Cold-process soap with cedarwood, pine, and activated charcoal.',
    description: 'A deep-cleansing bar made with sustainably sourced cedarwood essential oil, pine resin, and activated charcoal. Leaves skin feeling clean and grounded without stripping natural oils.',
    ingredients: 'Saponified Coconut Oil, Shea Butter, Cedarwood Oil, Pine Resin, Activated Charcoal',
    size: '4 oz bar',
    stock: 32,
    imageUrl: 'https://images.unsplash.com/photo-1600857062241-98a8b2c3b5a1?w=600',
    isFeatured: true,
  },
  {
    name: 'Chamomile Sleep Tea',
    slug: 'chamomile-sleep-tea',
    category: 'Teas',
    price: 12.99,
    shortDescription: 'A gentle evening blend of chamomile, lemon balm, and passionflower.',
    description: 'Grown and dried on the farm. This calming blend is designed to ease you into a restful night. Brew a cup 30 minutes before bed and feel the day soften.',
    ingredients: 'Organic Chamomile, Lemon Balm, Passionflower, Spearmint',
    size: '1.5 oz loose leaf',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600',
    isFeatured: true,
  },
  {
    name: 'Rosehip Facial Oil',
    slug: 'rosehip-facial-oil',
    category: 'Skincare',
    price: 24.99,
    shortDescription: 'Pure cold-pressed rosehip seed oil for glowing, nourished skin.',
    description: 'Sourced from small-batch cold pressing, this facial oil is rich in vitamins A and C. It absorbs quickly and supports skin tone, texture, and hydration without clogging pores.',
    ingredients: 'Rosa Canina (Rosehip) Seed Oil',
    size: '1 oz dropper bottle',
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600',
    isFeatured: false,
  },
  {
    name: 'Beeswax Taper Candles',
    slug: 'beeswax-taper-candles',
    category: 'Candles',
    price: 16.99,
    shortDescription: 'Hand-dipped pure beeswax tapers with a warm honey scent.',
    description: 'Rolled and dipped by hand using pure filtered beeswax from our own hives. These candles burn clean with no synthetic fragrance — just the gentle, warm scent of honey.',
    ingredients: '100% Pure Beeswax, Cotton Wick',
    size: 'Set of 2, 10 inch',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1602178591395-9f5b0c9f0f5b?w=600',
    isFeatured: false,
  },
  {
    name: 'Elderberry Tincture',
    slug: 'elderberry-tincture',
    category: 'Tinctures',
    price: 19.99,
    shortDescription: 'Immune-supporting elderberry extract in organic cane alcohol.',
    description: 'Made with hand-harvested elderberries macerated in organic cane alcohol for six weeks. A traditional immune-support remedy used for generations.',
    ingredients: 'Organic Elderberries, Organic Cane Alcohol, Distilled Water',
    size: '2 oz dropper bottle',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1559181567-c3190bae9c15?w=600',
    isFeatured: false,
  },
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected for seeding...')

    // Clear existing products
    await Product.deleteMany()
    console.log('Existing products cleared')

    // Insert fresh products
    await Product.insertMany(products)
    console.log(`${products.length} products seeded successfully`)

    process.exit(0)

  } catch (error) {
    console.error(`Seeder error: ${error.message}`)
    process.exit(1)
  }
}

seedDB()