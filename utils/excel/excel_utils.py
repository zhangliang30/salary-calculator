import xlrd
import xlwt


def read_excel_by_sheet(file_path, sheet_name):
    wb = xlrd.open_workbook(file_path)
    sheet = wb.sheet_by_name(sheet_name)
    rs = []
    for row in range(sheet.nrows):
        rs.append(sheet.row_values(row))
    return rs


def write(file_path, datas):
    book = xlwt.Workbook(encoding='utf-8')  # 创建一个Excel对象
    sheet1 = book.add_sheet('sheet1')  # 添加一个名为sheet1的sheet
    style = xlwt.XFStyle()
    for i in range(len(datas)):
        for j in range(2):
            sheet1.write(i, j, datas[i][j], style)
    book.save(file_path)  # 保存

