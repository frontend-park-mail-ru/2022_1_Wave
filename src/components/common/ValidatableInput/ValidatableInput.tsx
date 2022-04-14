import VDom from '../../../modules/VDom';
import { IComponentPropsCommon } from '../../../modules/VDom/IComponentProps';

const validationTimeGapMS = 600;

interface ValidatableInputProps extends IComponentPropsCommon {
  type: string;
  placeholder: string;
  onInput?: (_e: InputEvent) => void;
  class?: string;
  checker: (_value: string) => boolean;
  errorMessage: string;
}

type ValidatableInputState = {
  isInvalid: boolean;
};

export default class ValidatableInput extends VDom.Component<
  ValidatableInputProps,
  ValidatableInputState
> {
  private readonly inputRef: VDom.Ref<HTMLInputElement>;

  get value(): string {
    return (this.inputRef.instance as HTMLInputElement).value;
  }

  constructor(props: ValidatableInputProps) {
    super(props);

    this.inputRef = new VDom.Ref();
    this.state = {
      isInvalid: false,
    };

    this.inputHandler = this.inputHandler.bind(this);
  }

  validate(): boolean {
    const { instance: input } = this.inputRef;

    const isInvalid = !this.props.checker(input.value);
    this.setState({
      isInvalid,
    });

    return !isInvalid;
  }

  @VDom.util.Debounce(validationTimeGapMS)
  validateDebounced(): void {
    this.validate();
  }

  inputHandler(e: InputEvent): void {
    const { onInput } = this.props;

    if (onInput != null) {
      onInput(e);
    }

    this.validateDebounced();
  }

  render(): VDom.VirtualElement {
    const { isInvalid } = this.state;
    const { placeholder, type, errorMessage } = this.props;

    return (
      <>
        <input
          type={type}
          placeholder={placeholder}
          class={`${this.props.class ?? ''} input-line ${isInvalid ? 'input__wrong' : ''}`}
          ref={this.inputRef}
          onInput={this.inputHandler}
        />
        <label class={`tooltip_danger input-label ${isInvalid ? '' : 'invisible'}`}>
          {errorMessage}
        </label>
      </>
    );
  }
}
