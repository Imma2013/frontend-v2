export const getProductImage = (modelName: string): string => {
      const name = modelName.toLowerCase();

      // 1. Dynamic Island (iPhone 16, 15, 14 Pro)
      if (name.includes("iphone 16") || name.includes("iphone 15") || name.includes("iphone 14 pro")) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/IPhone_14_Pro_vector.svg/640px-IPhone_14_Pro_vector.svg.png";
      }

      // 2. Notch Design (iPhone 14, 13, 12, 11, X)
      if (name.includes("iphone 14") || name.includes("iphone 13") || name.includes("iphone 12") || name.includes("iphone 11") || name.includes("iphone x") || name.includes("xr") || name.includes("xs")) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/IPhone_13_Pro_vector.svg/640px-IPhone_13_Pro_vector.svg.png";
      }

      // 3. Home Button Design (SE, 8, 7, 6)
      if (name.includes("se") || name.includes("8") || name.includes("7") || name.includes("6")) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/IPhone_SE_%283rd_generation%29_vector.svg/640px-IPhone_SE_%283rd_generation%29_vector.svg.png";
      }

      // 4. Android / Fallback
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Pixel_7_Pro_vector.svg/640px-Pixel_7_Pro_vector.svg.png";
    };