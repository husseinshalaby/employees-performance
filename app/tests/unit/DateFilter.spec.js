import Filter from '../../components/vue-components/date-filter.vue'
import { mount } from '@vue/test-utils'
import * as getters from "../../store/getters.js"

describe('dateFilter.vue', () => {
    let wrapper;
    const fakeState = {
      filteredChartData: [
        {
          date_ms: 1641772800000,
          performance: 0.2,
        },
        {
          date_ms: 1641859200000,
          performance: 0.33,
        },
        {
          date_ms: 1641945600000,
          performance: 0.53,
        },
        {
          date_ms: 1642032000000,
          performance: 0.31,
        },
        {
          date_ms: 1642118400000,
          performance: 0.65,
        },
        {
          date_ms: 1642204800000,
          performance: 0.88,
        },
        {
          date_ms: 1642291200000,
          performance: 0.07,
        },
      ]
    } 
    const fakeData = getters.getFilteredChartData(fakeState)
    const fakeDateOne = 1344549600000
    const fakeDateTwo = 1641945600000
    const fakeDateThree = 1854776800000

    beforeEach(() => {
      wrapper = mount(Filter)
      Date.now = jest.fn(() => '2014-05-11')
      Date.yesterDay = jest.fn(() => '2014-05-10')
      Date.tomorrow = jest.fn(() => '2014-05-12')
    })

    test('it should render the date filter inputs', () => {
        const startDateInput = wrapper.find('#start')
        const endDateInput = wrapper.find('#end')

        expect(startDateInput).toBeTruthy()
        expect(endDateInput).toBeTruthy()
    })
    test('it should set a date value to the inputs', async () => {
        const startDateinput = wrapper.find('#start')
        const endDateInput = wrapper.find('#end')

        await startDateinput.setValue(Date.now())
        await endDateInput.setValue(Date.tomorrow())

        expect(wrapper.vm.startDate).toBe(Date.now())
        expect(wrapper.vm.endDate).toBe(Date.tomorrow())
        expect(wrapper.vm.warning).toBe('')
    })
    test('it should validate the input values', async () => {
        const startDateinput = wrapper.find('#start')
        const endDateInput = wrapper.find('#end')

        await startDateinput.setValue(Date.now())
        await endDateInput.setValue(Date.yesterDay())

        expect(wrapper.vm.endDate).toBe('')
    })
    test('it should render a validation warning', async () => {
        const startDateinput = wrapper.find('#start')
        const endDateInput = wrapper.find('#end')

        await startDateinput.setValue(Date.now())
        await endDateInput.setValue(Date.yesterDay())

        expect(wrapper.vm.warning).toBe('End date should be after start date!')    
    })
    test('it should filter data depending on date', () => {
      const allFilteredData = wrapper.vm.filterChartData(fakeData, fakeDateOne, fakeDateThree)
      const someFilteredData = wrapper.vm.filterChartData(fakeData, fakeDateOne, fakeDateTwo)
      const noFilteredData = wrapper.vm.filterChartData(fakeData, fakeDateThree, fakeDateOne)

      expect(allFilteredData.length).toBe(7)
      expect(someFilteredData.length).toBe(3)
      expect(noFilteredData.length).toBe(0)
    })
})