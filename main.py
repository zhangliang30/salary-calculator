from utils.excel import excel_utils
from meta import data_transfer
from role import bd_calculator


def read_meta_data():
    datas = excel_utils.read_excel_by_sheet("./商拓绩效数据-11月公示20201204.xlsx", "个人绩效")
    return datas[3:]


def process():
    datas = read_meta_data()
    items = data_transfer.convert(datas)

    bd_list = [item for item in items if (item.employee_title == "商家拓展" and item.employee_name == "陈凤强")]

    rs = []
    for item in bd_list:
        score = bd_calculator.calculate_for_bd(item)
        rs.append([item.employee_name, score])
        print("%s: %s" % (item.employee_name, score))
    excel_utils.write("output.xlsx", rs)


if __name__ == '__main__':
    process()
