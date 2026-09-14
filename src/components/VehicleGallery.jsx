import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { getVehicleGallery } from "../utils/placeholderImage";

export default function VehicleGallery({ vehicle }) {
  const images = getVehicleGallery(vehicle);
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setLightboxOpen(true)}
        className="block aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink/5"
        aria-label="Open image gallery"
      >
        <img
          src={images[active]}
          alt={`${vehicle.brand} ${vehicle.model} — view ${active + 1}`}
          className="h-full w-full object-cover"
        />
      </button>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${
              active === i ? "border-amber" : "border-transparent hover:border-ink/20"
            }`}
            aria-label={`Show image ${i + 1}`}
            aria-current={active === i}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <Modal show={lightboxOpen} onHide={() => setLightboxOpen(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="font-display text-base">
            {vehicle.brand} {vehicle.model}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Carousel activeIndex={active} onSelect={(idx) => setActive(idx)} interval={null}>
            {images.map((img, i) => (
              <Carousel.Item key={i}>
                <img src={img} alt={`View ${i + 1}`} className="d-block w-100" style={{ maxHeight: "70vh", objectFit: "cover" }} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </div>
  );
}
