import {
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  reactive,
  ref
} from 'vue'
import './index.scss'

type SizeType = 'mini' | 'small' | 'medium' | 'large'

const CcSwitch = defineComponent({
  name: 'cc-switch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    checkedValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    size: {
      type: String as PropType<SizeType>,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const className = computed(() => {
      const classes = ['cc-switch']
      props.disabled && classes.push('cc-switch-disabled')
      return classes.join(' ')
    })

    const styles: CSSProperties & {[propname: string]: any} = reactive({
      '--left': 1 + 'px',
      '--bg': '#bdc3c7'
    })

    const sizeMap = {
      'mini': 60 + 'px',
      'small': 70 + 'px',
      'medium': 80 + 'px',
      'large': 90 + 'px'
    }
    const animate = computed(() => {
      const w = {
        '--w': sizeMap[props.size]
      }
      return Object.assign(w, styles)
    })

    const currentValue = ref(props.inactiveValue)
    const value = ref<boolean>(props.value)
    const onClick = () => {
      if (props.disabled) return;
      value.value = !value.value
      if (value.value) {
        currentValue.value = props.checkedValue
        styles['--left'] = +sizeMap[props.size].split('p')[0] - 30 + 'px'
        styles['--bg'] = '#3498db'
      }
      if (!value.value) {
        currentValue.value = props.inactiveValue
        styles['--left'] = 1 + 'px'
        styles['--bg'] = '#bdc3c7'
      }
      emit("change", currentValue.value)
    }

    return () => (
      <div
        class={className.value}
        style={animate.value}
        onClick={onClick}
      ></div>
    )
  }
})

export default CcSwitch;