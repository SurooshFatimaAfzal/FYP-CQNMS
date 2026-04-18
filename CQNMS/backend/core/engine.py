import random
import time

class Server:
    def __init__(self, id):
        self.id = id
        self.name = f"Srv-{id}"
        self.load = 0

SERVERS = [Server(i) for i in range(1, 5)]
LOGS = []

def get_engine_stats(algo, intensity):
    global LOGS
    ALGO_STYLES = {
        "Round Robin": "#818cf8", "SJF": "#f472b6", 
        "Priority": "#fbbf24", "Least Loaded": "#34d399"
    }
    active_color = ALGO_STYLES.get(algo, "#94a3b8")

    if intensity <= 0:
        return {
            "active_algo": algo, "traffic": 0, "incoming_req_count": 0, "latency": 0.0,
            "throughput": 0, "queue_length": 0,
            "servers": [{"name": s.name, "load": 0} for s in SERVERS],
            "logs": LOGS[::-1]
        }

    traffic = int(intensity)
    incoming_requests = max(1, int(traffic * 0.02))
    congestion = (traffic / 2000) * 50 
    
    if algo == "SJF":
        latency, throughput = round(15 + congestion * 0.5, 2), max(90, 100 - int(congestion * 0.2))
    elif algo == "Least Loaded":
        latency, throughput = round(25 + congestion * 0.7, 2), max(85, 100 - int(congestion * 0.3))
    else: 
        latency, throughput = round(40 + congestion, 2), max(80, 100 - int(congestion * 0.5))

    for s in SERVERS:
        s.load = min(100, int((traffic / 4000) * 100) + random.randint(-2, 2)) if algo == "Least Loaded" else min(100, int((traffic / 1500) * 100) + random.randint(-10, 10))

    new_log = {
        "timestamp": time.strftime('%H:%M:%S'), "algo": algo,
        "message": f"{incoming_requests} Requests Routed ➜ {random.choice(SERVERS).name}",
        "color": active_color
    }
    LOGS.append(new_log)
    if len(LOGS) > 20: LOGS.pop(0)

    return {
        "active_algo": algo, "traffic": traffic, "incoming_req_count": incoming_requests,
        "latency": latency, "throughput": throughput, "queue_length": int(traffic / 100),
        "servers": [{"name": s.name, "load": max(0, s.load)} for s in SERVERS],
        "logs": LOGS[::-1]
    }