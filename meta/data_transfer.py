from meta import PerformanceItem


def regular_num(num):
    if num is None:
        return 0.0
    if num == "/":
        return 0.0
    return num


def convert(datas):
    if not datas:
        return []
    rs = []
    for row in datas:
        rs.append(PerformanceItem(
            employee_name=row[2],
            employee_title=row[3],
            sales_completion_rate=regular_num(row[6]),
            margin_completion_rate=regular_num(row[9]),
            new_precision_enterprises=regular_num(row[12]),
            new_extension_requirements=regular_num(row[16]),
            new_ka_connectors=regular_num(row[13]),
            visiting_customers=regular_num(row[11]),
            case_recovery_rate=regular_num(row[25]),
            location_customers=regular_num(row[26]),
            requirement_success_rate=regular_num(row[21]),
        ))
    return rs

