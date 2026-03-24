import re

def fix_tenant():
    path = "src/components/TenantSetupModal/TenantSetupModal.js"
    with open(path) as f: text = f.read()
    if "import { Button }" not in text:
        text = text.replace('import api from "../../services/api";', 'import api from "../../services/api";\nimport { Button } from "../ui";\nimport { toast } from "react-toastify";')
        with open(path, "w") as f: f.write(text)

def fix_customer():
    path = "src/components/EditCustomerModal/EditCustomerModal.js"
    with open(path) as f: text = f.read()
    if "import { Button }" not in text:
        text = text.replace('import api from "../../services/api";', 'import api from "../../services/api";\nimport { Button } from "../ui";\nimport { toast } from "react-toastify";')
        with open(path, "w") as f: f.write(text)

fix_tenant()
fix_customer()
print("Fixed imports in modals")
