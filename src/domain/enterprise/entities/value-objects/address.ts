import { ValueObject } from "@/core/entities/value-objects";

interface AddressProps {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string | null;
}

export class Address extends ValueObject<AddressProps> {
  constructor(props: AddressProps) {
    super(props);
    this.validate();
  }

  get cep(): string {
    return this.props.cep;
  }

  get state(): string {
    return this.props.state;
  }

  get city(): string {
    return this.props.city;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  get street(): string {
    return this.props.street;
  }

  get number(): string {
    return this.props.number;
  }

  get complement(): string | null {
    return this.props.complement;
  }

  private validate() {
    const cepClean = this.props.cep.replace("-", "");
    if (!cepClean || !/^\d{8}$/.test(cepClean) || cepClean.length !== 8) {
      throw new Error(
        "Invalid CEP format. Must be 8 digits (e.g., 12345678 or 12345-678)."
      );
    }

    if (
      !this.props.state ||
      this.props.state.length !== 2 ||
      !/^[A-Za-z]{2}$/.test(this.props.state)
    ) {
      throw new Error("State must be a 2-letter code (e.g., SP, RJ).");
    }

    if (!this.props.city || this.props.city.trim().length === 0) {
      throw new Error("City is required.");
    }
    if (!this.props.street || this.props.street.trim().length === 0) {
      throw new Error("Street is required.");
    }
    if (!this.props.number || this.props.number.trim().length === 0) {
      throw new Error("Number is required.");
    }
    if (
      this.props.neighborhood &&
      this.props.neighborhood.trim().length === 0
    ) {
      throw new Error("Neighborhood cannot be empty if provided.");
    }
  }

  toString(): string {
    return `${this.street}, ${this.number}, ${this.neighborhood}, ${
      this.city
    } - ${this.state}, CEP: ${this.cep}${
      this.complement ? `, ${this.complement}` : ""
    }`;
  }
}
