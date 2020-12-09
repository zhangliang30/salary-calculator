import logging


def cal_by_rate(rate, low_threshold, priority, max_score):
    if low_threshold and rate < low_threshold:
        return 0
    score = rate * priority
    if max_score and score > max_score:
        score = max_score
    return score


def cal_by_count(count, priority, max_score):
    score = count * priority
    if max_score and score > max_score:
        score = max_score
    return score


def calculate_for_bd(item):
    """
    商拓计算逻辑
    "毛利完成率"得分 score: if "毛利完成率" < 50% then score = 0 else score = "毛利完成率"*0.15, 最大score=0.15
    "需求成交率"得分 score = "需求成交率" 最大0.15
    "新增精准企业数"得分 score = "新增精准企业数" / 100 最大得分0.1
    "新增场推需求数"得分 score = "新增场推需求数" / 100 最大得分0.2
    "新增KA联系人数"得分 if value > 0 then 0.1 else 0
    "当面拜访"得分 score = value / 100 最大得分0.15
    "案例回收率"得分 if value < 100% then 0 else 0.05
    "Location意向客户数"得分 (value / 6) * 0.1 最大0.1 结果保留4位小数
    上面得分累加
    :return:
    """
    try:
        location_score = round((item.location_customers * 0.1) / 6, 4)
        scores = []
        scores.append(cal_by_rate(item.margin_completion_rate, 0.5, 0.15, 0.15))
        scores.append(cal_by_rate(item.requirement_success_rate, 0.0, 1, 0.15))
        scores.append(cal_by_count(item.new_precision_enterprises, 0.01, 0.1))
        scores.append(cal_by_count(item.new_extension_requirements, 0.01, 0.2))
        scores.append(0.1 if item.new_ka_connectors else 0.0)
        scores.append(cal_by_count(item.visiting_customers, 0.01, 0.15))
        scores.append(0.0 if item.case_recovery_rate < 1 else 0.05)
        scores.append(location_score)
        return sum(scores)
    except Exception as ex:
        logging.exception(ex)
        print("error %s" % item)
        return 0

