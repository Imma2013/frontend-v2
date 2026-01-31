# Stock Images Folder

## 📸 How to Add Product Images

### File Naming Convention:
Use lowercase with hyphens, matching the model name:

```
iphone-15-pro-max.jpg
iphone-14-pro-max.jpg
iphone-14-pro.jpg
iphone-13.jpg
iphone-12.jpg
samsung-s23-ultra.jpg
samsung-s22-ultra.jpg
```

### Important Rules:
1. **Same image for ALL grades** (Brand New, A, B, C, D)
2. Use `.jpg` or `.png` format
3. Recommended size: 800x800px or larger
4. Keep file sizes under 500KB for fast loading

### Example Models to Add:
- iPhone 15 Pro Max
- iPhone 15 Pro
- iPhone 15
- iPhone 14 Pro Max
- iPhone 14 Pro
- iPhone 14
- iPhone 13 Pro Max
- iPhone 13 Pro
- iPhone 13
- iPhone 12 Pro Max
- iPhone 12 Pro
- iPhone 12
- iPhone 11 Pro Max
- iPhone 11 Pro
- iPhone 11
- Samsung Galaxy S23 Ultra
- Samsung Galaxy S23+
- Samsung Galaxy S23
- Samsung Galaxy S22 Ultra
- Samsung Galaxy S21 Ultra

### Where to Get Images (LEGAL & SAFE):
1. **Unsplash** (https://unsplash.com) - Free, high-quality stock photos
   - Search: "iphone mockup", "samsung phone", "smartphone"
   - License: Free to use, no attribution required
   
2. **Pexels** (https://pexels.com) - Free stock photos
   - Search: "phone mockup", "smartphone product"
   - License: Free for commercial use

3. **AI-Generated Mockups** (RECOMMENDED):
   - Use AI tools to generate professional product mockups
   - Generic front screen displays (no brand-specific photography)
   - Avoids copyright issues completely

**⚠️ IMPORTANT:** Do NOT use official Apple/Samsung product photos - this is copyright infringement!

### Fallback System:
If an image is missing, the system automatically uses curated Unsplash URLs:
- Generic smartphone images
- Professional product mockups
- No copyright issues

### Recommended Unsplash URLs (Already in dataService.ts):
```
iPhone 15 Pro Max: https://images.unsplash.com/photo-1696446701796-da61225697cc
iPhone 14 Pro Max: https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1
Samsung S23 Ultra: https://images.unsplash.com/photo-1678911820864-e2c567c655d7
```

---

**Note:** After adding images, update `dataService.ts` to reference them:
```typescript
const MASTER_IMAGES: Record<string, string> = {
  'iPhone 15 Pro Max': '/stock-images/iphone-15-pro-max.jpg',
  'iPhone 14 Pro Max': '/stock-images/iphone-14-pro-max.jpg',
  // ... add more
};
```
