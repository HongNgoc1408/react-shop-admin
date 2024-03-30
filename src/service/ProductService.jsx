import createApiClient from "./ApiService";

class ProductService {
  constructor(baseUrl = "./api/product") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      const response = await this.api.get("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
}

export default new ProductService();
