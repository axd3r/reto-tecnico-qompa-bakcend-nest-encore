import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SunatService {
  private readonly BASE_URL = process.env.SUNAT_API_URL;

  constructor(private readonly http: HttpService) {}

  async validateRuc(ruc: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.BASE_URL}?numero=${ruc}`, {
          headers: {
            Authorization: `Bearer ${process.env.SUNAT_API_TOKEN}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('RUC inválido o no encontrado');
    }
  }
}