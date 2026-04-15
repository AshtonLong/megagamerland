const farmAddress = "663 McIntyre St W, North Bay, Ontario";

const farmDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  farmAddress
)}`;

export { farmAddress, farmDirectionsHref };
