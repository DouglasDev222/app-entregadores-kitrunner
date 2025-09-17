import { Address } from '../types/delivery';

export const openGoogleMaps = (address: Address) => {
  const fullAddress = `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  
  // Tenta abrir no app do Google Maps primeiro, senão abre no navegador
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  
  // Para dispositivos móveis, tenta abrir o app nativo
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    const nativeUrl = `comgooglemaps://?daddr=${encodedAddress}`;
    window.location.href = nativeUrl;
    
    // Fallback para o navegador se o app não estiver instalado
    setTimeout(() => {
      window.open(mapsUrl, '_blank');
    }, 500);
  } else {
    window.open(mapsUrl, '_blank');
  }
};

export const formatAddress = (address: Address): string => {
  return `${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ''}, ${address.neighborhood}, ${address.city}`;
};
