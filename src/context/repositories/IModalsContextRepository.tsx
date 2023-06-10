export interface IMoodalsContextRepository {
  warningIsTrue?: boolean;
  reservaModalIsOpen?: boolean;
  handleOpenReservaModal?: () => void;
  handleCloseReservaModal?: () => void;
  handleTurnOnWarning?: () => void;
  handleTurnOffWarning?: () => void;
}
