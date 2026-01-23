import api from './api';
import type { ApiResponse, PaymentConfirmRequest, PaymentConfirmResponse } from '@/types';

export const paymentApi = {
  
  // ******* //
  // 결제 승인 //
  // ******* //
  confirmPayment: async (
    orderId: string,
    data: PaymentConfirmRequest
  ): Promise<PaymentConfirmResponse> => {
    const response = await api.post<ApiResponse<PaymentConfirmResponse>>(
      `/api/payments/${orderId}/confirm`,
      data
    );
    return response.data.result;
  },

  // ******* //
  // 결제 취소 //
  // ******* //
  cancelPayment: async (
    orderId: string,
    paymentId: string,
    cancelReason: string
  ): Promise<void> => {
    await api.post(`/api/payments/${orderId}/cancel`, {
      paymentId,
      cancelReason,
    });
  },

  // 결제 상세 조회
  getPaymentDetail: async (paymentId: string) => {
    const response = await api.get(`/api/payments/${paymentId}`);
    return response.data.result;
  },

  // 빌링키 존재 여부 확인
  checkBillingKeyExists: async (): Promise<boolean> => {
    const response = await api.get<ApiResponse<boolean>>('/api/payments/billing-key/exists');
    return response.data.result;
  },

  // 빌링키 저장
  saveBillingKey: async (data: {
    userId: number;
    authKey: string;
    customerKey: string;
  }): Promise<void> => {
    const response = await api.post<ApiResponse<unknown>>('/api/payments/billing-key', data);
    if (!response.data.isSuccess) {
      throw new Error(response.data.message || '빌링키 저장에 실패했습니다.');
    }
  },

  // *********** //
  // 결제 정보 저장 //
  // *********** //
  savePaymentHistory: async (data: {
    userId: number;
    orderId: string;
    title: string;
    content: string;
    paymentMethod: string;
    paymentAmount: number;
    paymentKey: string;
  }): Promise<void> => {
    const response = await api.post<ApiResponse<unknown>>('/api/payments/history', data);
    if (!response.data.isSuccess) {
      throw new Error(response.data.message || '결제 정보 저장에 실패했습니다.');
    }
  },
};

export default paymentApi;
