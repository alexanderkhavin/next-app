// lib/api/client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER' | 'USER';

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status: number;
  error?: string;
}

export interface Instruction {
  id?: string;
  title: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt?: string;
  updatedAt?: string;
  author?: string;
}

export interface Location {
  id?: string;
  name: string;
  address: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Position {
  id?: string;
  title: string;
  description?: string;
  requirements?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  position?: Position;
  isActive: boolean;
  role?: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface Request {
  id?: string;
  title: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  userId: string;
  positionId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RequestAccept {
  id?: string;
  requestId: string;
  userId: string;
  status: 'ACCEPTED' | 'REJECTED';
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      let data;

      // Проверяем, есть ли тело ответа
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || data?.error || `HTTP ${response.status}`);
      }

      return {
        data: data,
        message: data?.message,
        status: response.status,
      };
    } catch (error) {
      console.error('API request error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 500,
      };
    }
  }

  // ==================== INSTRUCTION API ====================
  async getInstructions(): Promise<ApiResponse<Instruction[]>> {
    return this.request<Instruction[]>('/instruction/all');
  }

  async getInstruction(id: string): Promise<ApiResponse<Instruction>> {
    return this.request<Instruction>(`/instruction/get/${id}`);
  }

  async createInstruction(instruction: Omit<Instruction, 'id'>): Promise<ApiResponse<Instruction>> {
    return this.request<Instruction>('/instruction/create', {
      method: 'POST',
      body: JSON.stringify(instruction),
    });
  }

  async updateInstruction(id: string, instruction: Partial<Instruction>): Promise<ApiResponse<Instruction>> {
    return this.request<Instruction>(`/instruction/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(instruction),
    });
  }

  async deleteInstruction(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/instruction/delete/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== LOCATION API ====================
  async getLocations(): Promise<ApiResponse<Location[]>> {
    return this.request<Location[]>('/location/get/all');
  }

  async getLocation(id: string): Promise<ApiResponse<Location>> {
    return this.request<Location>(`/location/get/${id}`);
  }

  async createLocation(location: Omit<Location, 'id'>): Promise<ApiResponse<Location>> {
    return this.request<Location>('/location/create', {
      method: 'POST',
      body: JSON.stringify(location),
    });
  }

  async updateLocation(id: string, location: Partial<Location>): Promise<ApiResponse<Location>> {
    return this.request<Location>(`/location/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(location),
    });
  }

  async deleteLocation(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/location/delete/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== POSITION API ====================
  async getPositions(): Promise<ApiResponse<Position[]>> {
    return this.request<Position[]>('/position/all');
  }

  async getPosition(id: string): Promise<ApiResponse<Position>> {
    return this.request<Position>(`/position/get/${id}`);
  }

  async createPosition(position: Omit<Position, 'id'>): Promise<ApiResponse<Position>> {
    return this.request<Position>('/position/create', {
      method: 'POST',
      body: JSON.stringify(position),
    });
  }

  async updatePosition(id: string, position: Partial<Position>): Promise<ApiResponse<Position>> {
    return this.request<Position>(`/position/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(position),
    });
  }

  async deletePosition(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/position/delete/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== USER API ====================
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/user/getall');
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/user/get/${id}`);
  }

  async createUser(user: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    return this.request<User>('/user/create', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async updateUser(id: string, user: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/user/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/user/delete/${id}`, {
      method: 'DELETE',
    });
  }

  async checkUsernameExists(username: string): Promise<ApiResponse<boolean>> {
    return this.request<boolean>(`/users/search/existsByUsername?username=${username}`);
  }

  // ==================== REQUEST API ====================
  async getRequests(): Promise<ApiResponse<Request[]>> {
    return this.request<Request[]>('/request/getall');
  }

  async getRequest(id: string): Promise<ApiResponse<Request>> {
    return this.request<Request>(`/request/get/${id}`);
  }

  async createRequest(request: Omit<Request, 'id'>): Promise<ApiResponse<Request>> {
    return this.request<Request>('/request/create', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async updateRequest(id: string, request: Partial<Request>): Promise<ApiResponse<Request>> {
    return this.request<Request>(`/request/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  async deleteRequest(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/request/delete/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== REQUEST ACCEPT API ====================
  async getRequestAccepts(): Promise<ApiResponse<RequestAccept[]>> {
    return this.request<RequestAccept[]>('/requestAccepts');
  }

  async getRequestAccept(id: string): Promise<ApiResponse<RequestAccept>> {
    return this.request<RequestAccept>(`/requestAccepts/${id}`);
  }

  async createRequestAccept(accept: Omit<RequestAccept, 'id'>): Promise<ApiResponse<RequestAccept>> {
    return this.request<RequestAccept>('/requestAccepts', {
      method: 'POST',
      body: JSON.stringify(accept),
    });
  }

  async updateRequestAccept(id: string, accept: Partial<RequestAccept>): Promise<ApiResponse<RequestAccept>> {
    return this.request<RequestAccept>(`/requestAccepts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(accept),
    });
  }

  async deleteRequestAccept(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/requestAccepts/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== PROFILE API ====================
  async getProfile(): Promise<ApiResponse<any>> {
    return this.request<any>('/profile');
  }

  async getProfileInstructions(): Promise<ApiResponse<Instruction[]>> {
    return this.request<Instruction[]>('/profile/instructions');
  }

  async getProfileLocations(): Promise<ApiResponse<Location[]>> {
    return this.request<Location[]>('/profile/locations');
  }

  async getProfilePositions(): Promise<ApiResponse<Position[]>> {
    return this.request<Position[]>('/profile/positions');
  }

  async getProfileRequests(): Promise<ApiResponse<Request[]>> {
    return this.request<Request[]>('/profile/requests');
  }

  async getProfileRequestAccepts(): Promise<ApiResponse<RequestAccept[]>> {
    return this.request<RequestAccept[]>('/profile/requestAccepts');
  }

  async getProfileUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/profile/users');
  }
}

export const apiClient = new ApiClient();