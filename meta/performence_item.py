import json


class PerformanceItem:

    def __init__(self,
                 employee_name,
                 employee_title,
                 sales_completion_rate,
                 margin_completion_rate,
                 new_precision_enterprises,
                 new_extension_requirements,
                 new_ka_connectors,
                 visiting_customers,
                 case_recovery_rate,
                 location_customers,
                 requirement_success_rate,
                 ):
        # 员工姓名
        self.employee_name = employee_name
        # 员工职级
        self.employee_title = employee_title
        # 销售额完成率
        self.sales_completion_rate = sales_completion_rate
        # 毛利完成率
        self.margin_completion_rate = margin_completion_rate
        # 新增精准企业数
        self.new_precision_enterprises = new_precision_enterprises
        # 新增场推需求数
        self.new_extension_requirements = new_extension_requirements
        # 新增KA联系人数
        self.new_ka_connectors = new_ka_connectors
        # 当面拜访
        self.visiting_customers = visiting_customers
        # 案例回收率
        self.case_recovery_rate = case_recovery_rate
        # Location意向客户数
        self.location_customers = location_customers
        # 需求成交率
        self.requirement_success_rate = requirement_success_rate

    def __str__(self):
        return json.dumps(self.__dict__, ensure_ascii=False)
