import random
import time

class Server:
    def __init__(self, id):
        self.id = id
        self.name = f"SRV-{id}"
        self.load = 0

SERVERS = [Server(i) for i in range(1, 5)]
LOGS = []

def get_engine_stats(algo, intensity):
    global LOGS
    ALGO_STYLES = {
        "Round Robin": "#3b82f6", 
        "SJF": "#f472b6", 
        "Priority": "#fbbf24", 
        "Least Loaded": "#10b981"
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
    
    incoming_requests = int(traffic * 0.25) + random.randint(-10, 10)
    incoming_requests = max(1, incoming_requests)

    if algo == "SJF":
        latency = round(12 + (traffic / 120), 2)
        throughput = max(92, 100 - int(traffic / 600))
    elif algo == "Least Loaded":
        latency = round(18 + (traffic / 90), 2)
        throughput = max(88, 100 - int(traffic / 450))
    else: # Round Robin / Priority
        latency = round(25 + (traffic / 60), 2)
        throughput = max(82, 100 - int(traffic / 350))

    # ✅ SERVER LOAD: Intensity barhne par load barhega
    for s in SERVERS:
        # Har server par load distribute ho raha hai
        base_load = (traffic / 2000) * 100
        variation = random.randint(-5, 15)
        s.load = min(100, max(0, int(base_load + variation)))

    # LOGGING
    new_log = {
        "timestamp": time.strftime('%H:%M:%S'), 
        "algo": algo,
        "message": f"{incoming_requests} Requests Routed ➜ {random.choice(SERVERS).name}",
        "color": active_color
    }
    LOGS.append(new_log)
    if len(LOGS) > 25: LOGS.pop(0)

    return {
        "active_algo": algo, 
        "traffic": traffic, 
        "incoming_req_count": incoming_requests,
        "latency": latency, 
        "throughput": throughput, 
        "queue_length": int(traffic / 80),
        "servers": [{"name": s.name, "load": s.load} for s in SERVERS],
        "logs": LOGS[::-1]
    }