import { createContext, useContext, useMemo, useState } from "react";

interface EnquiryContextValue {
  isOpen: boolean;
  selectedService?: string;
  openModal: (service?: string) => void;
  closeModal: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | undefined>(undefined);

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openModal = (service?: string) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const value = useMemo(
    () => ({ isOpen, selectedService, openModal, closeModal }),
    [isOpen, selectedService]
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
};

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }
  return context;
};
